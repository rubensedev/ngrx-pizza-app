import { Update } from '@ngrx/entity';
import * as PizzasActions from './pizzas.actions';
import { Pizza } from '../../_interfaces/pizza.interface';

describe('Pizzas Actions', () => {
  const mockPizza: Pizza = {
    id: 1,
    name: 'Margherita',
    toppings: [],
  };

  const mockUpdate: Update<Pizza> = {
    id: 1,
    changes: { name: 'Pepperoni' },
  };

  describe('loadPizzasActions', () => {
    it('should create Load action', () => {
      const action = PizzasActions.loadPizzasActions.load();
      expect(action.type).toBe('[Pizzas/Load] Load');
    });

    it('should create Success action', () => {
      const action = PizzasActions.loadPizzasActions.success({
        pizzas: [mockPizza],
      });
      expect(action.type).toBe('[Pizzas/Load] Success');
      expect(action.pizzas).toEqual([mockPizza]);
    });

    it('should create Failure action', () => {
      const error = { message: 'Failed to load pizzas' };
      const action = PizzasActions.loadPizzasActions.failure({ error });
      expect(action.type).toBe('[Pizzas/Load] Failure');
      expect(action.error).toEqual(error);
    });
  });

  describe('createPizzaActions', () => {
    it('should create Create action', () => {
      const action = PizzasActions.createPizzaActions.create({
        pizza: mockPizza,
      });
      expect(action.type).toBe('[Pizzas/Create] Create');
      expect(action.pizza).toEqual(mockPizza);
    });

    it('should create Success action', () => {
      const action = PizzasActions.createPizzaActions.success({
        pizza: mockPizza,
      });
      expect(action.type).toBe('[Pizzas/Create] Success');
      expect(action.pizza).toEqual(mockPizza);
    });

    it('should create Failure action', () => {
      const error = { message: 'Failed to create pizza' };
      const action = PizzasActions.createPizzaActions.failure({ error });
      expect(action.type).toBe('[Pizzas/Create] Failure');
      expect(action.error).toEqual(error);
    });
  });

  describe('updatePizzaActions', () => {
    it('should create Update action', () => {
      const action = PizzasActions.updatePizzaActions.update({
        update: mockUpdate,
      });
      expect(action.type).toBe('[Pizzas/Update] Update');
      expect(action.update).toEqual(mockUpdate);
    });

    it('should create Success action', () => {
      const action = PizzasActions.updatePizzaActions.success({
        update: mockUpdate,
      });
      expect(action.type).toBe('[Pizzas/Update] Success');
      expect(action.update).toEqual(mockUpdate);
    });

    it('should create Failure action', () => {
      const error = { message: 'Failed to update pizza' };
      const action = PizzasActions.updatePizzaActions.failure({ error });
      expect(action.type).toBe('[Pizzas/Update] Failure');
      expect(action.error).toEqual(error);
    });
  });

  describe('deletePizzaActions', () => {
    it('should create Delete action', () => {
      const action = PizzasActions.deletePizzaActions.delete({
        pizza: mockPizza,
      });
      expect(action.type).toBe('[Pizzas/Delete] Delete');
      expect(action.pizza).toEqual(mockPizza);
    });

    it('should create Success action', () => {
      const action = PizzasActions.deletePizzaActions.success({
        pizza: mockPizza,
      });
      expect(action.type).toBe('[Pizzas/Delete] Success');
      expect(action.pizza).toEqual(mockPizza);
    });

    it('should create Failure action', () => {
      const error = { message: 'Failed to delete pizza' };
      const action = PizzasActions.deletePizzaActions.failure({ error });
      expect(action.type).toBe('[Pizzas/Delete] Failure');
      expect(action.error).toEqual(error);
    });
  });
});
