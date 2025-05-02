import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as ToppingsActions from '../actions/toppings.actions';

import { ToppingsService } from '../../_services/toppings.service';

export const loadToppingsEffect = createEffect(
  (
    actions$: Actions<
      ReturnType<typeof ToppingsActions.loadToppingsActions.load>
    > = inject(Actions),
    toppingsService = inject(ToppingsService)
  ) => {
    return actions$.pipe(
      filter(
        (action) =>
          action.type === ToppingsActions.loadToppingsActions.load.type
      ),
      switchMap(() =>
        toppingsService.getToppings().pipe(
          map((toppings) =>
            ToppingsActions.loadToppingsActions.success({ toppings })
          ),
          catchError((error) =>
            of(ToppingsActions.loadToppingsActions.failure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
