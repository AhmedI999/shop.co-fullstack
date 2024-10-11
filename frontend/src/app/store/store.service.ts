import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './store.model';
import {catchError, map, tap, throwError} from 'rxjs';
import {
  API_DELETE_USER_PRODUCT_PATH,
  API_EDIT_USER_CART_PATH,
  API_GET_PRODUCTS_PATH,
  API_GET_USER_CART_PATH
} from '../app.apiRoutes';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private httpClient = inject(HttpClient);
  private userProducts = signal<Product[]>([]);
  loadedUserProducts = this.userProducts.asReadonly();

  loadAvailableProducts() {
    return this.fetchProducts(
      API_GET_PRODUCTS_PATH,
      'Something went wrong fetching the available products. please try again later.'
    );
  }

  loadUserCart() {
    return this.fetchProducts(API_GET_USER_CART_PATH,
      'Something went wrong fetching the user cart. please try again later.')
      .pipe(
        tap({
          next: (userProducts) => this.userProducts.set(userProducts),
        })
      );
  }

  addProductToUserCart(product: Product) {
    const preCart = this.userProducts();

    const productAlreadyExists = preCart.some(p => p.id === product.id)
    if (!productAlreadyExists) {
      this.userProducts.update(prevProducts => [...prevProducts, product]);
    }
    if (productAlreadyExists) {
      product.amount++;
      this.userProducts.update(prevProducts => [...prevProducts, product]);
    }


    return this.httpClient.put(API_EDIT_USER_CART_PATH, {
      productId: product.id,
    })
      .pipe(
        catchError(err => {
          this.userProducts.set(preCart);
          return throwError(() => new Error('Failed to add selected product to the cart.'));
        })
      );
  }

  removeUserPlace(product: Product) {
    const prevPlaces = this.userProducts();

    const isPlaceExists = prevPlaces.some(p => p.id === product.id);

    if (isPlaceExists) {
      this.userProducts.update(currentProducts =>
        currentProducts.filter(p => p.id != product.id));
    }
    if (!isPlaceExists) {
      console.error("error can't delete the selected product.");
    }

    return this.deleteProduct(API_DELETE_USER_PRODUCT_PATH, product.id)
      .pipe(
        catchError(err => {
          this.userProducts.set(prevPlaces);
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

  private deleteProduct(url: string, productId: string){
    return this.httpClient.delete(`${url}/${productId}`);
  }
}
