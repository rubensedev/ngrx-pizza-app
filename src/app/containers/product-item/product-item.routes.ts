import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';

import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';

import { PizzasService } from '../../_services/pizzas.service';

import { provideFeature } from '../../_utils';

export const PRODUCT_ITEM_ROUTES: Routes = [
  {
    path: 'new',
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [{ effect: PizzasEffects.createPizzaEffects }],
        providers: [PizzasService],
      }),
    ],
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
  {
    path: ':pizzaId',
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
];
