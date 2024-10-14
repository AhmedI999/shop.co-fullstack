import {Component, input} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faMinus, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {API_IMAGE_PATH} from '../../../app.apiRoutes';
import {Product} from '../../store.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faTrash = faTrash;
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
  cartItem = input.required<Product>();
}
