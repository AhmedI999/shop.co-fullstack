import {Component, effect, inject, OnInit, output, signal} from '@angular/core';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {StoreService} from '../../store.service';
import {MessageAlertComponent} from '../../../shared/message-alert/message-alert.component';

@Component({
  selector: 'app-cart-order',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule,
    MessageAlertComponent
  ],
  templateUrl: './cart-order.component.html',
  styleUrl: './cart-order.component.scss'
})
export class CartOrderComponent{
  protected readonly faEnvelope = faEnvelope;
  private storeService = inject(StoreService);
  totalAmount = signal<number>(0);
  isCheckedOut = signal<boolean>(false);
  checkOutForm = new FormGroup({});
  onCartClear = output();

  constructor() {
    // update cartTotal on change
    effect(() => {
      this.totalAmount.set(this.storeService.getCartTotal());
    }, {allowSignalWrites: true});
  }

  onCheckout() {
    this.storeService.clearUserCart().subscribe({
      complete: () => {
        this.isCheckedOut.set(true);
        this.onCartClear.emit();
        this.totalAmount.set(0);
      },
    });
  }

  getDatePlusTwoDays(): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 2);
    // Formatting the date as YYYY-MM-DD
    return currentDate.toISOString().split('T')[0];
  }
}
