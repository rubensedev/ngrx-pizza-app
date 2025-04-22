import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as PizzasActions from '../actions/pizzas.actions';

import { PizzasService } from '../../_services/pizzas.service';

export const loadPizzasEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const pizzasService = inject(PizzasService);

    return actions$.pipe(
      filter((action) => action.type === PizzasActions.loadPizzas.type),
      switchMap(() =>
        pizzasService.getPizzas().pipe(
          map((pizzas) => PizzasActions.loadPizzasSuccess({ pizzas })),
          catchError((error) => of(PizzasActions.loadPizzasFail({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const createPizzaEffects = createEffect(
  () => {
    const action$ = inject(Actions);
    const pizzasService = inject(PizzasService);

    return action$.pipe(
      filter((action) => action.type === PizzasActions.createPizza.type),
      switchMap(({ pizza }) =>
        pizzasService.createPizza(pizza).pipe(
          map((pizza) => PizzasActions.createPizzaSuccess({ pizza })),
          catchError((error) => of(PizzasActions.createPizzaFail({ error })))
        )
      )
    );
  },
  { functional: true }
);
