import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';

import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';
import * as RouterEffects from '../../_store/router/effects/router.effects';

import { PizzasService } from '../../_services/pizzas.service';

import { loadPizzasGuard } from '../../_guards/loadPizzas.guard';

import { provideFeature } from '../../_utils';
import { pizzaExistsGuard } from '../../_guards/pizzaExists.guard';

export const PRODUCT_ITEM_ROUTES: Routes = [
  {
    path: 'new',
    canActivate: [loadPizzasGuard],
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [
          { effect: PizzasEffects.loadPizzasEffect },
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
    canActivate: [pizzaExistsGuard],
    providers: [
      provideHttpClient(),
      provideFeature(PizzasReducers.pizzasFeature, {
        effects: [
          { effect: PizzasEffects.loadPizzasEffect },
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
