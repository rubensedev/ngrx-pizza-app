import { Routes } from '@angular/router';

import * as PizzasReducers from '../../_store/reducers/pizzas.reducers';
import * as PizzasEffects from '../../_store/effects/pizzas.effects';
import * as ToppingsReducers from '../../_store/reducers/toppings.reducers';
import * as ToppingsEffects from '../../_store/effects/toppings.effects';

// Services
import { PizzasService } from '../../_services/pizzas.service';
import { ToppingsService } from '../../_services/toppings.service';

// Guards
import { loadPizzasGuard } from '../../_guards/loadPizzas.guard';
import { loadToppingsGuard } from '../../_guards/loadToppings.guard';
import { pizzaExistsGuard } from '../../_guards/pizzaExists.guard';

import { provideFeature } from '../../_utils';

export const PRODUCT_ITEM_ROUTES: Routes = [
  {
    path: 'new',
    canActivate: [loadPizzasGuard, loadToppingsGuard],
    providers: [
      provideFeature(
        [PizzasReducers.pizzasFeature, ToppingsReducers.toppingsFeature],
        {
          effects: [
            { effect: PizzasEffects.createPizzaEffect },
            { effect: PizzasEffects.createPizzaSuccessEffect },
            { effect: ToppingsEffects.loadToppingsEffect },
          ],
          providers: [PizzasService, ToppingsService],
        }
      ),
    ],
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
  {
    path: ':pizzaId',
    canActivate: [pizzaExistsGuard, loadToppingsGuard],
    providers: [
      provideFeature(
        [PizzasReducers.pizzasFeature, ToppingsReducers.toppingsFeature],
        {
          effects: [
            { effect: PizzasEffects.updatePizzaEffect },
            { effect: PizzasEffects.deletePizzaEffect },
            { effect: PizzasEffects.handlePizzaSuccessEffect },
            { effect: ToppingsEffects.loadToppingsEffect },
          ],
          providers: [PizzasService, ToppingsService],
        }
      ),
    ],
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
];
