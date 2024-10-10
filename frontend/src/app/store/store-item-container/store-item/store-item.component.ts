import {Component, input, OnInit} from '@angular/core';
import {Product} from '../../store.model';


@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.scss'
})
export class StoreItemComponent{
  product = input.required<Product>();
}



