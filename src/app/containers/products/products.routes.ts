import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import * as PizzasReducers from '../../_store/pizzas/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/pizzas/effects/pizzas.effects';

import { PizzasService } from '../../_services/pizzas.service';

import { provideFeature } from '../../_utils';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [{ effect: PizzasEffects.loadPizzasEffects }],
        providers: [PizzasService],
      }),
    ],
    loadComponent: () =>
      import('./products.component').then((x) => x.ProductsComponent),
  },
  // it's relative to the parent, so lazy-load the relative children
  {
    path: '',
    loadChildren: () =>
      import('../product-item/product-item.routes').then(
        (x) => x.PRODUCT_ITEM_ROUTES
      ),
  },
];
