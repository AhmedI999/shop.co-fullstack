import {Component, effect, inject, input, OnInit, output, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {API_IMAGE_PATH, isHostNetlify} from '../../../app.apiRoutes';
import {Product} from '../../store.model';
import {StoreService} from '../../store.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit{
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faTrash = faTrash;
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
  private storeService = inject(StoreService);
  cartItem = input.required<Product>();
  itemAmount = signal<number>(0);
  onDeleteItem = output<Product []>();

  ngOnInit(): void {
    this.itemAmount.set(this.cartItem().amount);
  }

  onMinusCLicked() {
    if (this.itemAmount() > 1) this.itemAmount.update(cur => --cur);
    this.storeService.addProductToUserCart({
      ...this.cartItem(),
      amount: this.itemAmount(),
      isUpdate: false
    }, isHostNetlify()).subscribe();
  }

  onPlusCLicked() {
    this.itemAmount.update(cur => ++cur);
    this.storeService.addProductToUserCart({
      ...this.cartItem(),
      amount: this.itemAmount(),
      isUpdate: false
    }).subscribe();
  }

  onItemDelete() {
    this.storeService.removeUserProduct(this.cartItem()).subscribe({
      next: value => this.onDeleteItem.emit(value.userCart),
    });
  }
}

