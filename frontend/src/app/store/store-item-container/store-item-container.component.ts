import {Component, DestroyRef, inject, signal} from '@angular/core';
import {StoreItemComponent} from "./store-item/store-item.component";
import {StoreService} from '../store.service';
import {Product} from '../store.model';

@Component({
  selector: 'app-store-item-container',
  standalone: true,
    imports: [
        StoreItemComponent
    ],
  templateUrl: './store-item-container.component.html',
  styleUrl: './store-item-container.component.scss'
})
export class StoreItemContainerComponent {
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  products = signal<Product[] | undefined>(undefined);
  error = signal('');

  ngOnInit(): void {
    this.isFetching.set(true);
    const storeProductsSubscription = this.storeService.loadAvailableProducts()
      .subscribe({
        next: prodcuts => {
          this.products.set(prodcuts);
          console.log(prodcuts);
        },
        complete: () => this.isFetching.set(false),
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      })
    this.destroyRef.onDestroy(() => storeProductsSubscription.unsubscribe());
  }
}
