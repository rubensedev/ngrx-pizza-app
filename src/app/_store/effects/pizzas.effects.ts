import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as PizzasActions from '../actions/pizzas.actions';
import * as RouterActions from '../router/actions/router.actions';

import { PizzasService } from '../../_services/pizzas.service';

export const loadPizzasEffect = createEffect(
  (
    actions$: Actions<
      ReturnType<typeof PizzasActions.loadPizzasActions.load>
    > = inject(Actions),
    pizzasService = inject(PizzasService)
  ) => {
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
  (
    actions$: Actions<
      ReturnType<typeof PizzasActions.createPizzaActions.create>
    > = inject(Actions),
    pizzasService = inject(PizzasService)
  ) => {
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

export const createPizzaSuccessEffect = createEffect(
  (
    actions$: Actions<
      ReturnType<typeof PizzasActions.createPizzaActions.success>
    > = inject(Actions)
  ) => {
    return actions$.pipe(
      filter(
        (action) =>
          action.type === PizzasActions.createPizzaActions.success.type
      ),
      map(({ pizza }) =>
        RouterActions.routerNavigateActions.go({
          path: ['/products', pizza.id],
        })
      )
    );
  },
  { functional: true }
);

export const updatePizzaEffect = createEffect(
  (
    actions$: Actions<
      ReturnType<typeof PizzasActions.updatePizzaActions.update>
    > = inject(Actions),
    pizzasService = inject(PizzasService)
  ) => {
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
  (
    actions$: Actions<
      ReturnType<typeof PizzasActions.deletePizzaActions.delete>
    > = inject(Actions),
    pizzasService = inject(PizzasService)
  ) => {
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

export const handlePizzaSuccessEffect = createEffect(
  (
    actions$: Actions<
      | ReturnType<typeof PizzasActions.updatePizzaActions.success>
      | ReturnType<typeof PizzasActions.deletePizzaActions.success>
    > = inject(Actions)
  ) => {
    return actions$.pipe(
      filter(
        (action) =>
          action.type === PizzasActions.updatePizzaActions.success.type ||
          action.type === PizzasActions.deletePizzaActions.success.type
      ),
      map(() =>
        RouterActions.routerNavigateActions.go({
          path: ['/products'],
        })
      )
    );
  },
  { functional: true }
);
