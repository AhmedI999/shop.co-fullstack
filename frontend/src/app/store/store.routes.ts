import {Routes} from '@angular/router';
import {StoreComponent} from './store.component';
import {StoreItemPageComponent} from './store-item-container/store-item/store-item-page/store-item-page.component';
import {StoreProductsComponent} from './store-products/store-products.component';

export const storeRoutes: Routes = [
  {
    path: '',
    component: StoreProductsComponent,
  },
  {
    path: 'products/:productId',
    component: StoreItemPageComponent
  }


]
