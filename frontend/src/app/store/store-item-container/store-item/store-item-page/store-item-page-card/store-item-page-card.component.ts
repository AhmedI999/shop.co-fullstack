import {ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCheckCircle, faEllipsisH, faMinus, faPlus, faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../../../store.model';
import {API_IMAGE_PATH} from '../../../../../app.apiRoutes';
import {StoreService} from '../../../../store.service';
import {NgClass} from '@angular/common';
import {MessageAlertComponent} from '../../../../../shared/message-alert/message-alert.component';

@Component({
  selector: 'app-store-item-page-card',
  standalone: true,
  imports: [
    FaIconComponent,
    NgClass,
    MessageAlertComponent
  ],
  templateUrl: './store-item-page-card.component.html',
  styleUrl: './store-item-page-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemPageCardComponent implements OnInit{
  protected readonly faStar = faStar;
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faStarHalfAlt = faStarHalfAlt;
  protected readonly faEllipsisH = faEllipsisH;
  protected readonly faCheckCircle = faCheckCircle;
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
  product = input.required<Product>()
  fullStars: number[] = [];
  hasHalfStar: boolean = false;
  quantity = signal<number>(1);

  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isAdding = signal(false);
  isSuccessfullyAdded = signal(false)
  error = signal('');

  private calculateStars(): void {
    const rating = parseFloat(this.product().rating);
    const fullStarsCount = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    this.fullStars = Array(fullStarsCount).fill(0);
    this.hasHalfStar = hasHalf;
  }

  ngOnInit(): void {
    // displaying rating stars
    this.calculateStars();
  }

  onMinusPressed() {
    if (this.quantity() > 1) this.quantity.update(cur => --cur);
  }

  onPlusPressed() {
    this.quantity.update(cur => ++cur);
  }

  onAddToCartClicked() {
    // creating user product
    const userProduct: Product = {
      id: this.product().id,
      image: this.product().image,
      rating: this.product().rating,
      details: this.product().details,
      amount: this.quantity() || 0,
    }
    // saving item to cart
    this.isAdding = signal(true);
    const addingToCartSubscription = this.storeService.addProductToUserCart(userProduct)
      .subscribe({
        next: value => console.log(value),
        complete: () => {
          this.isAdding.set(false)
          this.isSuccessfullyAdded.set(true);
          setTimeout(() => {
            this.isSuccessfullyAdded.set(false);
          }, 2000);
        },
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      });
    this.destroyRef.onDestroy(() => addingToCartSubscription.unsubscribe());
  }

}
