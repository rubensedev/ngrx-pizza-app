import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';
import * as ToppingsReducers from '../../_store/reducers/toppings.reducers';
import * as ToppingsEffects from '../../_store/effects/toppings.effects';

import { PizzasService } from '../../_services/pizzas.service';
import { ToppingsService } from '../../_services/toppings.service';

import { loadPizzasGuard } from '../../_guards/loadPizzas.guard';

import { provideFeature } from '../../_utils';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [loadPizzasGuard],
    providers: [
      provideHttpClient(),
      provideFeature(
        [PizzasReducers.pizzasFeature, ToppingsReducers.toppingsFeature],
        {
          effects: [
            { effect: PizzasEffects.loadPizzasEffect },
            { effect: ToppingsEffects.loadToppingsEffect },
          ],
          providers: [PizzasService, ToppingsService],
        }
      ),
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
