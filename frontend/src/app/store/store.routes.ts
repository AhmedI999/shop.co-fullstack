import {Routes} from '@angular/router';
import {StoreItemPageComponent} from './store-item-container/store-item/store-item-page/store-item-page.component';
import {StoreProductsComponent} from './store-products/store-products.component';
import {StoreCartComponent} from './store-cart/store-cart.component';
import {StoreComponent} from './store.component';
import {StoreLayoutComponent} from './store-layout/store-layout.component';

export const storeRoutes: Routes = [
  {
    path: '',
    component: StoreLayoutComponent,
    children: [
      { path: '', component: StoreProductsComponent },
      { path: 'products/:productId', component: StoreItemPageComponent  },
      { path: 'cart', component: StoreCartComponent }
    ]
  },
];
