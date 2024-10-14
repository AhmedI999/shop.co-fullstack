import { Component } from '@angular/core';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart-order',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cart-order.component.html',
  styleUrl: './cart-order.component.scss'
})
export class CartOrderComponent {

  protected readonly faEnvelope = faEnvelope;
}
