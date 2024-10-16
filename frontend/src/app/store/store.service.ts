import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './store.model';
import {catchError, EMPTY, map, of, tap, throwError} from 'rxjs';
import {
  API_DELETE_USER_CART_PATH,
  API_DELETE_USER_PRODUCT_PATH,
  API_EDIT_USER_CART_PATH, API_GET_PRODUCT_PATH,
  API_GET_PRODUCTS_PATH,
  API_GET_USER_CART_PATH
} from '../app.apiRoutes';
import {popper} from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private httpClient = inject(HttpClient);
  private userCart = signal<Product[]>([]);
  private cartTotal = signal<number>(0);  // Signal to track total cart amount

  getCartTotal() {
    return this.cartTotal();
  }

  loadAvailableProducts() {
    return this.fetchProducts(
      API_GET_PRODUCTS_PATH,
      'Something went wrong fetching the available products. please try again later.'
    );
  }

  loadProductById(productId: string) {
    return this.fetchProduct(
      `${API_GET_PRODUCT_PATH}/${productId}`,
    'Something went wrong fetching the available products. please try again later.'
  );
  }

  loadUserCart(isNetlify: boolean = false) {
    if (isNetlify) {
      const cartFromLocalStorage = localStorage.getItem('userCart');
      if (cartFromLocalStorage) {
        const parsedCart = JSON.parse(cartFromLocalStorage);
        this.userCart.set(parsedCart);
        this.calculateCartTotal();
        return of(parsedCart);  // Simulate rxjs observable
      }
    }

    // Fallback to HTTP request for non-Netlify environments
    return this.fetchProducts(API_GET_USER_CART_PATH,
      'Something went wrong fetching the user cart. please try again later.')
      .pipe(
        tap(products => {
          this.userCart.set(products);
          this.calculateCartTotal();  // Recalculate total after loading cart
        })
      );
  }


  addProductToUserCart(product: Product, isNetlify: boolean = false) {
    const preCart = this.userCart(); // Store current state of the cart

    const productAlreadyExists = preCart.some(p => p.id === product.id);
    if (!productAlreadyExists) {
      this.userCart.update(prevProducts => [...prevProducts, product]);
    } else {
        this.userCart.update(prevProducts => {
          return prevProducts.map(p => p.id === product.id ? { ...p,
            details: {
              ...p.details,
              colors: product.details.colors,
              isUpdate: product.isUpdate,
            },amount: product.amount } : p);
        });
      }

    this.calculateCartTotal(); // Recalculate the total

    // If Netlify is true, save to localStorage and stop further execution
    if (isNetlify) {
      const updatedCart = this.userCart();  // Get the updated cart
      console.log('Updated cart:', this.userCart());
      localStorage.setItem('userCart', JSON.stringify(updatedCart));
      return EMPTY; // returning empty observable to signify no further action
    }

    // For local development and non-Netlify environments, proceed with the HTTP request
    //   console.log(preCart.find(p => p.id === product.id)?.amount);
    //   console.log(product.amount);
    //   console.log((preCart.find(p => p.id === product.id)?.amount || 0 ) + product.amount);
    return this.httpClient.put<{ userProducts: Product[] }>(API_EDIT_USER_CART_PATH, {
      productId: product.id,
      amount: product.amount,
      chosenColors: product.details.colors,
      isUpdate: product.isUpdate,
    })
      .pipe(
        catchError(err => {
          console.error(err);
          this.userCart.set(preCart);  // Revert to previous state on error
          return throwError(() => new Error('Failed to add selected product to the cart.'));
        })
      );
  }




  removeUserProduct(product: Product) {
    const prevCart = this.userCart();
    const isProductExists = prevCart.some(p => p.id === product.id);

    if (isProductExists) {
      // Update cart locally
      this.userCart.update(currentProducts =>
        currentProducts.filter(p => p.id !== product.id)
      );
      this.calculateCartTotal();  // Update the total price
    }
    this.calculateCartTotal();
    return this.httpClient.delete<{ userCart: Product[] }>(`${API_DELETE_USER_PRODUCT_PATH}/${product.id}`)
      .pipe(
        catchError(err => {
          // On error, revert to the previous cart state
          this.userCart.set(prevCart);
          return throwError(() => new Error('Failed to delete the product.'));
        })
      );
  }

  clearUserCart() {
    return this.httpClient.delete<{ message: string }>(API_DELETE_USER_CART_PATH)
      .pipe(
        catchError(err => {
          console.error('Failed to clear cart:', err);
          return throwError(() => new Error('Failed to clear cart.'));
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
  // Method to calculate total cart amount
  private calculateCartTotal() {
    const total = this.userCart().reduce((acc, item) => acc + (+item.details.price * item.amount), 0);
    this.cartTotal.set(total);
  }
}
