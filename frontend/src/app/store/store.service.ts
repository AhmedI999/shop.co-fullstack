import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './store.model';
import {catchError, map, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private httpClient = inject(HttpClient);
  private userProducts = signal<Product[]>([]);
  loadedUserProducts = this.userProducts.asReadonly();

  loadAvailableProducts() {
    return this.fetchProducts(
      'http://localhost:3000/products',
      'Something went wrong fetching the available products. please try again later.'
    );
  }

  loadUserCart() {
    return this.fetchProducts('http://localhost:3000/user-cart',
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


    return this.httpClient.put('http://localhost:3000/user-cart', {
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

    return this.deleteProduct('http://localhost:3000/user-products', product.id)
      .pipe(
        catchError(err => {
          this.userProducts.set(prevPlaces);
          return throwError(() => new Error('Failed to delete the product. 404 Not found'));
        })
      );
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
