import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './store.model';
import {catchError, map, tap, throwError} from 'rxjs';
import {
  API_DELETE_USER_PRODUCT_PATH,
  API_EDIT_USER_CART_PATH, API_GET_PRODUCT_PATH,
  API_GET_PRODUCTS_PATH,
  API_GET_USER_CART_PATH
} from '../app.apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private httpClient = inject(HttpClient);
  private userCart = signal<Product[]>([]);

  loadAvailableProducts() {
    return this.fetchProducts(
      API_GET_PRODUCTS_PATH,
      'Something went wrong fetching the available products. please try again later.'
    );
  }

  loadProductById(productId: string) {
    return this.fetchProduct(
      API_GET_PRODUCT_PATH + `/${productId}`,
      'Something went wrong fetching the available products. please try again later.'
    );
  }

  loadUserCart() {
    return this.fetchProducts(API_GET_USER_CART_PATH,
      'Something went wrong fetching the user cart. please try again later.')
  }

  addProductToUserCart(product: Product) {
    const preCart = this.userCart();

    const productAlreadyExists = preCart.some(p => p.id === product.id);
    if (!productAlreadyExists) {
      this.userCart.update(prevProducts => [...prevProducts, product]);
    }
    if (productAlreadyExists) {
      this.userCart.update(prevProducts => {
        return prevProducts.map(p => p.id === product.id ? { ...p, amount: product.amount } : p);
      });
    }

    return this.httpClient.put(API_EDIT_USER_CART_PATH, {
      productId: product.id,
      amount: product.amount  // <-- Include amount here
    })
      .pipe(
        catchError(err => {
          this.userCart.set(preCart);  // Revert to previous state on error
          return throwError(() => new Error('Failed to add selected product to the cart.'));
        })
      );
  }

  removeUserProduct(product: Product) {
    const prevPlaces = this.userCart();

    const isPlaceExists = prevPlaces.some(p => p.id === product.id);

    if (isPlaceExists) {
      this.userCart.update(currentProducts =>
        currentProducts.filter(p => p.id != product.id));
    }
    if (!isPlaceExists) {
      console.error("error can't delete the selected product.");
    }

    return this.deleteProduct(API_DELETE_USER_PRODUCT_PATH, product.id)
      .pipe(
        catchError(err => {
          this.userCart.set(prevPlaces);
          return throwError(() => new Error('Failed to delete the product. 404 Not found'));
        })
      );
  }

  updatePaginatedProducts(currentPage: number,
                          productsPerPage: number,
                          allProducts: WritableSignal<Product[] | undefined>): Product[] | undefined
  {
    if (!allProducts()) return undefined;

    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    return allProducts()!.slice(startIndex, endIndex);
  }


  private fetchProducts(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ products: Product[] }>(url)
      .pipe(
        map((resData) => resData.products),
        catchError((error) => {
          console.error(error);
          return throwError(() => {
            return new Error(errorMessage);
          });
        })
      );
  }
  private fetchProduct(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ product: Product }>(url)
      .pipe(
        map((resData) => resData.product),
        catchError((error) => {
          console.error(error);
          return throwError(() => {
            return new Error(errorMessage);
          });
        })
      );
  }

  private deleteProduct(url: string, productId: string){
    return this.httpClient.delete(`${url}/${productId}`);
  }
}
