import {
  toppingAdapter,
  toppingsFeature,
  ToppingState,
} from '../reducers/toppings.reducers';
import { Topping } from '../../_interfaces/topping.interface';

describe('Toppings Selectors', () => {
  const mockToppings: Topping[] = [
    { id: 1, name: 'Cheese' },
    { id: 2, name: 'Pepperoni' },
    { id: 3, name: 'Mushrooms' },
  ];

  const initialState: ToppingState = toppingAdapter.setAll(mockToppings, {
    ids: [1, 2, 3],
    entities: {
      1: mockToppings[0],
      2: mockToppings[1],
      3: mockToppings[2],
    },
    loading: false,
    loaded: true,
    error: null,
    selectedToppingsIds: [1, 3],
  });

  it('should select all toppings', () => {
    const result = toppingsFeature.selectAll({ toppings: initialState });
    expect(result.length).toBe(3);
    expect(result).toEqual(mockToppings);
  });

  it('should select toppings entities', () => {
    const result = toppingsFeature.selectEntities({ toppings: initialState });
    expect(result[1]).toEqual(mockToppings[0]);
    expect(result[2]).toEqual(mockToppings[1]);
  });

  it('should select topping ids', () => {
    const result = toppingsFeature.selectIds({ toppings: initialState });
    expect(result).toEqual([1, 2, 3]);
  });

  it('should select total toppings count', () => {
    const result = toppingsFeature.selectTotal({ toppings: initialState });
    expect(result).toBe(3);
  });

  it('should select the feature state itself', () => {
    const result = toppingsFeature.selectToppingsState({
      toppings: initialState,
    });
    expect(result).toEqual(initialState);
  });
});
