import { Actions, createEffect } from '@ngrx/effects';
import * as RouterActions from '../actions/router.actions';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { Location } from '@angular/common';

export const routerNavigateEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof RouterActions.routerNavigateActions.go>
    > = inject(Actions);
    const router: Router = inject(Router);
    return actions$.pipe(
      filter(
        (action) => action.type === RouterActions.routerNavigateActions.go.type
      ),
      tap(({ path, query: queryParams, extras }) => {
        router.navigate(path, { queryParams, ...extras });
      })
    );
  },
  // This effect does not dispatch another action at the end
  { functional: true, dispatch: false }
);

export const routerNavigateBackEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof RouterActions.routerNavigateActions.back>
    > = inject(Actions);
    const location: Location = inject(Location);
    return actions$.pipe(
      filter(
        (action) =>
          action.type === RouterActions.routerNavigateActions.back.type
      ),
      tap(() => location.back())
    );
  },
  { functional: true, dispatch: false }
);

export const routerNavigateForwardEffect = createEffect(
  () => {
    const actions$: Actions<
      ReturnType<typeof RouterActions.routerNavigateActions.forward>
    > = inject(Actions);
    const location: Location = inject(Location);
    return actions$.pipe(
      filter(
        (action) =>
          action.type === RouterActions.routerNavigateActions.forward.type
      ),
      tap(() => location.forward())
    );
  },
  { functional: true, dispatch: false }
);
