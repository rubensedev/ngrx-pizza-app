import { of, throwError } from 'rxjs';

// store
import * as ToppingsActions from '../actions/toppings.actions';
import { loadToppingsEffect } from './toppings.effects';

import { ToppingsService } from '../../_services/toppings.service';

import { Topping } from '../../_interfaces/topping.interface';

describe('Toppings Effects', () => {
  describe('loadToppingsEffect', () => {
    const mockToppings: Topping[] = [
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
    ];

    it('should dispatch success action on successful toppings fetch', (done) => {
      const actions$ = of(ToppingsActions.loadToppingsActions.load());
      const expectedAction = ToppingsActions.loadToppingsActions.success({
        toppings: mockToppings,
      });
      const toppingsServiceMock: Partial<ToppingsService> = {
        getToppings: () => of(mockToppings),
      };

      loadToppingsEffect(
        actions$,
        toppingsServiceMock as ToppingsService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch failure action on error', (done) => {
      const error = new Error('Load failed');
      const actions$ = of(ToppingsActions.loadToppingsActions.load());
      const expectedAction = ToppingsActions.loadToppingsActions.failure({
        error,
      });
      const toppingsServiceMock: Partial<ToppingsService> = {
        getToppings: () => throwError(() => error),
      };
      // TODO: which approach is better
      // const toppingsServiceMock = jasmine.createSpyObj<ToppingsService>(
      //   'ToppingsService',
      //   ['getToppings']
      // );
      // toppingsServiceMock.getToppings.and.returnValue(throwError(() => error));

      loadToppingsEffect(
        actions$,
        toppingsServiceMock as ToppingsService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });
});
