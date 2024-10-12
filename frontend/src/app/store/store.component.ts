import {Component} from '@angular/core';
import {FooterComponent} from '../shared/footer/footer.component';
import {StoreProductsComponent} from './store-products/store-products.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    FooterComponent,
    StoreProductsComponent,
    RouterOutlet

  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent{

}
