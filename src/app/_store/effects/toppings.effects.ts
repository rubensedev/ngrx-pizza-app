import { inject } from '@angular/core';

import { catchError, filter, map, of, switchMap } from 'rxjs';

import { Actions, createEffect } from '@ngrx/effects';
import * as ToppingsActions from '../actions/toppings.actions';

import { ToppingsService } from '../../_services/toppings.service';

export const loadToppingsEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const toppingsService = inject(ToppingsService);

    return actions$.pipe(
      filter((action) => action.type === ToppingsActions.loadTopppings.type),
      switchMap(() =>
        toppingsService.getToppings().pipe(
          map((toppings) => ToppingsActions.loadToppingsSuccesss({ toppings })),
          catchError((error) => of(ToppingsActions.loadToppingsFail({ error })))
        )
      )
    );
  },
  { functional: true }
);
