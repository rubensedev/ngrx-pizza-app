import { CanActivateFn } from '@angular/router';

import { catchError, of, switchMap } from 'rxjs';

import { checkPizzasLoadedFromStore } from '../_utils';

export const loadPizzasGuard: CanActivateFn = () => {
  return checkPizzasLoadedFromStore().pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};
