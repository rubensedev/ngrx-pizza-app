import { CanActivateFn } from '@angular/router';

import { catchError, of, switchMap } from 'rxjs';

import * as PizzasReducers from '../_store/reducers/pizzas.reducers';
import * as PizzasActions from '../_store/actions/pizzas.actions';

import { checkIfLoadedFromStore } from '../_utils';

export const loadPizzasGuard: CanActivateFn = () => {
  return checkIfLoadedFromStore(
    PizzasReducers.pizzasFeature.selectLoaded,
    PizzasActions.loadPizzasActions.load
  ).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
