import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

// store
import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';
import * as RouterEffects from '../../_store/router/effects/router.effects';

import { PizzasService } from '../../_services/pizzas.service';

import { loadPizzasGuard } from '../../_guards/loadPizzas.guard';

import { provideFeature } from '../../_utils';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [loadPizzasGuard],
    providers: [
      provideHttpClient(),
      provideFeature([PizzasReducers.pizzasFeature], {
        effects: [{ effect: PizzasEffects.loadPizzasEffect }],
        providers: [PizzasService],
      }),
    ],
    loadComponent: () =>
      import('./products.component').then((x) => x.ProductsComponent),
  },
  // it's relative to the parent, so lazy-load the relative children
  {
    path: '',
    providers: [
      provideHttpClient(),
      provideFeature([PizzasReducers.pizzasFeature], {
        effects: [
          { effect: PizzasEffects.loadPizzasEffect },
          { effect: RouterEffects.routerNavigateEffect },
        ],
        providers: [PizzasService],
      }),
    ],
    loadChildren: () =>
      import('../product-item/product-item.routes').then(
        (x) => x.PRODUCT_ITEM_ROUTES
      ),
  },
];
