import {Component, input, OnInit} from '@angular/core';
import {Product} from '../../store.model';
import {API_IMAGE_PATH} from '../../../app.apiRoutes';


@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.scss'
})
export class StoreItemComponent{
  product = input.required<Product>();
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
}



