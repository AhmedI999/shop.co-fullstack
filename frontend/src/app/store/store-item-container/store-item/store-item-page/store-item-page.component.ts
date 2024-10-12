import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {NavComponent} from '../../../../shared/nav/nav.component';
import {
  HorizontalOvercompensation
} from '../../../../shared/horizental-seperator/horizontal-overcompensation.component';
import {NavigatorComponent} from '../../../../shared/navigator/navigator.component';
import {StoreItemComponent} from '../store-item.component';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {StoreItemPageCardComponent} from './store-item-page-card/store-item-page-card.component';
import {StoreService} from '../../../store.service';
import {Product} from '../../../store.model';

@Component({
  selector: 'app-store-item-page',
  standalone: true,
  imports: [
    NavComponent,
    HorizontalOvercompensation,
    NavigatorComponent,
    StoreItemComponent,
    FaIconComponent,
    StoreItemPageCardComponent
  ],
  templateUrl: './store-item-page.component.html',
  styleUrl: './store-item-page.component.scss'
})
export class StoreItemPageComponent implements OnInit{
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  product = signal<Product | undefined>(undefined);
  error = signal('');
  productId = input.required<string>();

  ngOnInit(): void {
    this.isFetching.set(true);
    const storeProductSubscription = this.storeService.loadProductById(this.productId())
      .subscribe({
        next: prodcut => {
          this.product.set(prodcut);
        },
        complete: () => this.isFetching.set(false),
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      });
    this.destroyRef.onDestroy(() => storeProductSubscription.unsubscribe());
  }


}
