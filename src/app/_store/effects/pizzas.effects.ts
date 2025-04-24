import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as PizzasActions from '../actions/pizzas.actions';

import { PizzasService } from '../../_services/pizzas.service';

export const loadPizzasEffects = createEffect(
  () => {
    const actions$: Actions<ReturnType<typeof PizzasActions.loadPizzas>> =
      inject(Actions);
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
    const actions$: Actions<ReturnType<typeof PizzasActions.createPizza>> =
      inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
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

export const updatePizzaEffects = createEffect(
  () => {
    const actions$: Actions<ReturnType<typeof PizzasActions.updatePizza>> =
      inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
      filter((action) => action.type === PizzasActions.updatePizza.type),
      switchMap(({ update }) =>
        pizzasService.updatePizza(update.changes).pipe(
          map((updatedPizza) =>
            PizzasActions.updatePizzaSuccess({
              update: { id: updatedPizza.id as number, changes: updatedPizza },
            })
          ),
          catchError((error) => of(PizzasActions.updatePizzaFail({ error })))
        )
      )
    );
  },
  { functional: true }
);
