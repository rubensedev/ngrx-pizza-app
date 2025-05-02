import { of, throwError } from 'rxjs';

import * as PizzasActions from '../actions/pizzas.actions';
import * as PizzasEffects from './pizzas.effects';
import * as RouterActions from '../router/actions/router.actions';

import { PizzasService } from '../../_services/pizzas.service';

import { Pizza } from '../../_interfaces/pizza.interface';

describe('Pizza Effects', () => {
  const mockPizzas: Pizza[] = [
    { id: 1, name: 'Margherita', toppings: [] },
    { id: 2, name: 'Pepperoni', toppings: [] },
  ];

  const mockPizza: Pizza = { id: 3, name: 'Hawaiian', toppings: [] };

  describe('loadPizzasEffect', () => {
    it('should dispatch success action on successful pizza fetch', (done) => {
      const actions$ = of(PizzasActions.loadPizzasActions.load());
      const expectedAction = PizzasActions.loadPizzasActions.success({
        pizzas: mockPizzas,
      });
      const pizzasServiceMock: Partial<PizzasService> = {
        getPizzas: () => of(mockPizzas),
      };

      PizzasEffects.loadPizzasEffect(
        actions$,
        pizzasServiceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch failure action on pizza fetch error', (done) => {
      const error = new Error('Failed to load pizzas');
      const actions$ = of(PizzasActions.loadPizzasActions.load());
      const expectedAction = PizzasActions.loadPizzasActions.failure({ error });
      const pizzasServiceMock: Partial<PizzasService> = {
        getPizzas: () => throwError(() => error),
      };

      PizzasEffects.loadPizzasEffect(
        actions$,
        pizzasServiceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('createPizzaEffect', () => {
    it('should dispatch success action on pizza creation', (done) => {
      const actions$ = of(
        PizzasActions.createPizzaActions.create({ pizza: mockPizza })
      );
      const expectedAction = PizzasActions.createPizzaActions.success({
        pizza: mockPizza,
      });
      const pizzasServiceMock: Partial<PizzasService> = {
        createPizza: () => of(mockPizza),
      };

      PizzasEffects.createPizzaEffect(
        actions$,
        pizzasServiceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch failure action on pizza creation error', (done) => {
      const error = new Error('Create failed');
      const actions$ = of(
        PizzasActions.createPizzaActions.create({ pizza: mockPizza })
      );
      const expectedAction = PizzasActions.createPizzaActions.failure({
        error,
      });
      const pizzasServiceMock: Partial<PizzasService> = {
        createPizza: () => throwError(() => error),
      };

      PizzasEffects.createPizzaEffect(
        actions$,
        pizzasServiceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('updatePizzaEffect', () => {
    it('should dispatch success action on update', (done) => {
      const update = { id: mockPizza.id as number, changes: mockPizza };
      const actions$ = of(PizzasActions.updatePizzaActions.update({ update }));
      const expectedAction = PizzasActions.updatePizzaActions.success({
        update: { id: mockPizza.id as number, changes: mockPizza },
      });
      const serviceMock: Partial<PizzasService> = {
        updatePizza: () => of(mockPizza),
      };

      PizzasEffects.updatePizzaEffect(
        actions$,
        serviceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch failure action on update error', (done) => {
      const error = new Error('Update failed');
      const update = { id: mockPizza.id as number, changes: mockPizza };
      const expectedAction = PizzasActions.updatePizzaActions.failure({
        error,
      });
      const actions$ = of(PizzasActions.updatePizzaActions.update({ update }));
      const serviceMock: Partial<PizzasService> = {
        updatePizza: () => throwError(() => error),
      };

      PizzasEffects.updatePizzaEffect(
        actions$,
        serviceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('deletePizzaEffect', () => {
    it('should dispatch success action on delete', (done) => {
      const actions$ = of(
        PizzasActions.deletePizzaActions.delete({ pizza: mockPizza })
      );
      const expectedAction = PizzasActions.deletePizzaActions.success({
        pizza: mockPizza,
      });
      const serviceMock: Partial<PizzasService> = {
        deletePizza: () => of(mockPizza),
      };

      PizzasEffects.deletePizzaEffect(
        actions$,
        serviceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should dispatch failure action on delete error', (done) => {
      const error = new Error('Delete failed');
      const actions$ = of(
        PizzasActions.deletePizzaActions.delete({ pizza: mockPizza })
      );
      const expectedAction = PizzasActions.deletePizzaActions.failure({
        error,
      });
      const serviceMock: Partial<PizzasService> = {
        deletePizza: () => throwError(() => error),
      };

      PizzasEffects.deletePizzaEffect(
        actions$,
        serviceMock as PizzasService
      ).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('handlePizzaSuccessEffect', () => {
    it('should navigate to /products on update success', (done) => {
      const actions$ = of(
        PizzasActions.updatePizzaActions.success({
          update: { id: mockPizza.id as number, changes: mockPizza },
        })
      );
      const expectedAction = RouterActions.routerNavigateActions.go({
        path: ['/products'],
      });

      PizzasEffects.handlePizzaSuccessEffect(actions$).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });

    it('should navigate to /products on delete success', (done) => {
      const actions$ = of(
        PizzasActions.deletePizzaActions.success({ pizza: mockPizza })
      );
      const expectedAction = RouterActions.routerNavigateActions.go({
        path: ['/products'],
      });

      PizzasEffects.handlePizzaSuccessEffect(actions$).subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });
});
