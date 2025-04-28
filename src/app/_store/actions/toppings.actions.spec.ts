import { Topping } from '../../_interfaces/topping.interface';
import * as ToppingsActions from './toppings.actions';

describe('Toppings Actions', () => {
  const mockToppings: Topping[] = [
    { id: 1, name: 'pepperoni' },
    { id: 2, name: 'mozzarella' },
  ];

  describe('loadToppingsActions', () => {
    it('should create Load action', () => {
      const action = ToppingsActions.loadToppingsActions.load();
      expect(action.type).toBe('[Toppings/Load] Load');
    });

    it('should create Success action', () => {
      const action = ToppingsActions.loadToppingsActions.success({
        toppings: mockToppings,
      });
      expect(action.type).toBe('[Toppings/Load] Success');
      expect(action.toppings).toEqual(mockToppings);
    });

    it('should create Failure action', () => {
      const error = { message: 'Failed to load toppings' };
      const action = ToppingsActions.loadToppingsActions.failure({ error });
      expect(action.type).toBe('[Toppings/Load] Failure');
    });
  });

  describe('visualiseToppingsAction', () => {
    it('should create Visualise action', () => {
      const selectedToppingsIds: Topping['id'][] = [
        mockToppings[0].id,
        mockToppings[1].id,
      ];
      const action = ToppingsActions.visualiseToppingsAction({
        selectedToppingsIds,
      });
      expect(action.type).toBe('[Toppings/Visualise] Visualise');
      expect(action.selectedToppingsIds).toEqual(selectedToppingsIds);
    });
  });
});
