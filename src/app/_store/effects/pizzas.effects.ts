import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as PizzasActions from '../actions/pizzas.actions';

import { PizzasService } from '../../_services/pizzas.service';

export const loadPizzasEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof PizzasActions.loadPizzasActions.load>
    > = inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
      filter(
        (action) => action.type === PizzasActions.loadPizzasActions.load.type
      ),
      switchMap(() =>
        pizzasService.getPizzas().pipe(
          map((pizzas) => PizzasActions.loadPizzasActions.success({ pizzas })),
          catchError((error) =>
            of(PizzasActions.loadPizzasActions.failure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createPizzaEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof PizzasActions.createPizzaActions.create>
    > = inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
      filter(
        (action) => action.type === PizzasActions.createPizzaActions.create.type
      ),
      switchMap(({ pizza }) =>
        pizzasService.createPizza(pizza).pipe(
          map((newPizza) =>
            PizzasActions.createPizzaActions.success({ pizza: newPizza })
          ),
          catchError((error) =>
            of(PizzasActions.createPizzaActions.failure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const updatePizzaEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof PizzasActions.updatePizzaActions.update>
    > = inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
      filter(
        (action) => action.type === PizzasActions.updatePizzaActions.update.type
      ),
      switchMap(({ update }) =>
        pizzasService.updatePizza(update.changes).pipe(
          map((updatedPizza) =>
            PizzasActions.updatePizzaActions.success({
              update: { id: updatedPizza.id as number, changes: updatedPizza },
            })
          ),
          catchError((error) =>
            of(PizzasActions.updatePizzaActions.failure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deletePizzaEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof PizzasActions.deletePizzaActions.delete>
    > = inject(Actions);
    const pizzasService = inject(PizzasService);
    return actions$.pipe(
      filter(
        (action) => action.type === PizzasActions.deletePizzaActions.delete.type
      ),
      switchMap(({ pizza: deletedPizza }) =>
        pizzasService.deletePizza(deletedPizza).pipe(
          map(() =>
            PizzasActions.deletePizzaActions.success({ pizza: deletedPizza })
          ),
          catchError((error) =>
            of(PizzasActions.deletePizzaActions.failure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
