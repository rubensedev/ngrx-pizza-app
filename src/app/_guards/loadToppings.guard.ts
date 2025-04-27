import { CanActivateFn } from '@angular/router';

import { catchError, of, switchMap } from 'rxjs';

import * as ToppingsReducers from '../_store/reducers/toppings.reducers';
import * as ToppingsActions from '../_store/actions/toppings.actions';

import { checkIfLoadedFromStore } from '../_utils';

export const loadToppingsGuard: CanActivateFn = () => {
  return checkIfLoadedFromStore(
    ToppingsReducers.toppingsFeature.selectLoaded,
    ToppingsActions.loadToppingsActions.load
  ).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
