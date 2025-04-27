import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';

// ngrx - store
import { Store } from '@ngrx/store';
import { ProductsState } from '../_store/reducers';
import * as PizzasReducers from '../_store/reducers/pizzas.reducers';
import * as PizzasActions from '../_store/actions/pizzas.actions';

export const loadPizzasGuard: CanActivateFn = () => {
  const store = inject(Store<ProductsState>);
  const checkPizzasLoadedFromStore: Observable<boolean> = store
    .select(PizzasReducers.pizzasFeature.selectLoaded)
    .pipe(
      tap((loaded) => {
        if (!loaded) {
          store.dispatch(PizzasActions.loadPizzasActions.load());
        }
      }),
      // we wait to loaded is 'true' and then take 1 value and finishe with complete and 'unsuscribe'
      filter((loaded) => loaded),
      take(1)
    );

  return checkPizzasLoadedFromStore.pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
