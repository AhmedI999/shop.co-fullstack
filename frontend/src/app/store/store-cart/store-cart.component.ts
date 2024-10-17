import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {NavComponent} from '../../shared/nav/nav.component';
import {HorizontalOvercompensation} from '../../shared/horizental-seperator/horizontal-overcompensation.component';
import {NavigatorComponent} from '../../shared/navigator/navigator.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {CartItemComponent} from './cart-item/cart-item.component';
import {CartOrderComponent} from './cart-order/cart-order.component';
import {NewsLetterComponent} from '../../shared/news-letter/news-letter.component';
import {StoreService} from '../store.service';
import {Product} from '../store.model';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-store-cart',
  standalone: true,
  imports: [
    NavComponent,
    HorizontalOvercompensation,
    NavigatorComponent,
    FooterComponent,
    CartItemComponent,
    CartOrderComponent,
    NewsLetterComponent,
    RouterLink
  ],
  templateUrl: './store-cart.component.html',
  styleUrl: './store-cart.component.scss'
})
export class StoreCartComponent implements OnInit{
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');
  userCart = signal<Product[]>([]);

  ngOnInit(): void {
    this.isFetching.set(true);
    const cartItemsSubscription = this.storeService.loadUserCart()
      .subscribe({
        next: items => {
          this.userCart.set(items);
        },
        complete: () => this.isFetching.set(false),
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      });
    this.destroyRef.onDestroy(() => cartItemsSubscription.unsubscribe());
  }

  onItemDeleted(updatedCart: Product[]) {
    this.userCart.set(updatedCart);
  }

  onCartCleared() {
    this.userCart.set([]);
  }
}
