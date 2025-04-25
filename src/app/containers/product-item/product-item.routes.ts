import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';

import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';
import * as RouterEffects from '../../_store/router/effects/router.effects';

import { PizzasService } from '../../_services/pizzas.service';

import { provideFeature } from '../../_utils';

export const PRODUCT_ITEM_ROUTES: Routes = [
  {
    path: 'new',
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [
          { effect: PizzasEffects.createPizzaEffect },
          { effect: PizzasEffects.createPizzaSuccessEffect },
          { effect: RouterEffects.routerNavigateEffect },
        ],
        providers: [PizzasService],
      }),
    ],
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
  {
    path: ':pizzaId',
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [
          { effect: PizzasEffects.updatePizzaEffect },
          { effect: PizzasEffects.deletePizzaEffect },
          { effect: PizzasEffects.handlePizzaSuccessEffect },
          { effect: RouterEffects.routerNavigateEffect },
        ],
        providers: [PizzasService],
      }),
    ],
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
];
