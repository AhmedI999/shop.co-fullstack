import { Routes } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {StoreComponent} from './store/store.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
    loadChildren: () => import('./store/store.routes').then(mod => mod.storeRoutes),
  }
];
