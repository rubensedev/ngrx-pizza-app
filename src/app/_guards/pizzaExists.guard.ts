import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { map, Observable, of, switchMap, take } from 'rxjs';

//ngrx - store
import { Store } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { ProductsState } from '../_store/reducers';
import * as PizzasReducers from '../_store/reducers/pizzas.reducers';
import * as RouterActions from '../_store/router/actions/router.actions';

import { checkPizzasLoadedFromStore } from '../_utils';

import { Pizza } from '../_interfaces/pizza.interface';

export const pizzaExistsGuard: CanActivateFn = (route) => {
  const store = inject(Store<ProductsState>);
  const id: string = route.params['pizzaId'];

  const hasPizza = (): Observable<boolean> => {
    return store.select(PizzasReducers.pizzasFeature.selectEntities).pipe(
      map((entities: Dictionary<Pizza>) => !!entities[id]),
      take(1)
    );
  };

  const redirectToProducts = (): Observable<false> => {
    store.dispatch(
      RouterActions.routerNavigateActions.go({ path: ['products'] })
    );
    return of(false);
  };

  return checkPizzasLoadedFromStore().pipe(
    switchMap(() => hasPizza()),
    switchMap((exists) => (exists ? of(true) : redirectToProducts()))
  );
};
