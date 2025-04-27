import { inject } from '@angular/core';

import { filter, Observable, take, tap } from 'rxjs';

// ngrx - store
import { Action, Store } from '@ngrx/store';
import { ProductsState } from '../_store/reducers';

export const checkIfLoadedFromStore = (
  selector: (state: ProductsState) => boolean,
  action: () => Action<string>
): Observable<boolean> => {
  const store = inject(Store<ProductsState>);
  return store.select(selector).pipe(
    tap((loaded) => {
      if (!loaded) {
        store.dispatch(action());
      }
    }),
    // we wait to loaded is 'true' and then take 1 value and finishe with complete and 'unsuscribe'
    filter((loaded) => loaded),
    take(1)
  );
};
