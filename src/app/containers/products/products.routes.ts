import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideState } from '@ngrx/store';

import { pizzasFeature } from '../../_store/reducers/pizzas.reducers';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [provideHttpClient(), provideState(pizzasFeature)],
    loadComponent: () =>
      import('./products.component').then((x) => x.ProductsComponent),
  },
  // it's relative to the parent, so lazy-load the relative children
  {
    path: '',
    providers: [provideHttpClient()],
    loadChildren: () =>
      import('../product-item/product-item.routes').then(
        (x) => x.PRODUCT_ITEM_ROUTES
      ),
  },
];
