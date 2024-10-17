import { Routes } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.routes').then(mod => mod.storeRoutes),
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
