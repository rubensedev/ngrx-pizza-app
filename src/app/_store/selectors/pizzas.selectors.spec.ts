import {
  pizzasFeature,
  pizzaAdapter,
  PizzaState,
} from '../reducers/pizzas.reducers';
import { selectPizza, selectPizzaVisualised } from './pizzas.selectors';
import { Pizza } from '../../_interfaces/pizza.interface';
import { Topping } from '../../_interfaces/topping.interface';

describe('Pizzas Selectors', () => {
  const mockToppings: Topping[] = [
    { id: 1, name: 'Cheese' },
    { id: 2, name: 'Tomato' },
    { id: 3, name: 'Bacon' },
  ];

  const mockPizzas: Pizza[] = [
    { id: 1, name: 'Margherita', toppings: [mockToppings[1], mockToppings[2]] },
    { id: 2, name: 'Meat Lovers', toppings: [mockToppings[3]] },
  ];

  const initialState: PizzaState = pizzaAdapter.setAll(mockPizzas, {
    ids: [1, 2],
    entities: {
      1: mockPizzas[0],
      2: mockPizzas[1],
    },
    loading: false,
    loaded: true,
    error: null,
  });

  // --- Basic Feature Selectors ---
  it('should select all pizzas', () => {
    const result = pizzasFeature.selectAll({ pizzas: initialState });
    expect(result.length).toBe(2);
    expect(result).toEqual(mockPizzas);
  });

  it('should select pizza entities', () => {
    const result = pizzasFeature.selectEntities({ pizzas: initialState });
    expect(result).toEqual({
      1: mockPizzas[0],
      2: mockPizzas[1],
    });
  });

  it('should select pizza ids', () => {
    const result = pizzasFeature.selectIds({ pizzas: initialState });
    expect(result).toEqual([1, 2]);
  });

  it('should select total pizza count', () => {
    const result = pizzasFeature.selectTotal({ pizzas: initialState });
    expect(result).toBe(2);
  });

  it('should select feature state itself', () => {
    const result = pizzasFeature.selectPizzasState({ pizzas: initialState });
    expect(result).toEqual(initialState);
  });

  // --- Custom Selectors ---
  it('should select pizza from router param', () => {
    const result = selectPizza.projector(initialState.entities, {
      pizzaId: 1,
    });
    expect(result).toEqual(mockPizzas[0]);
  });

  it('should select pizza with visualised toppings', () => {
    const result = selectPizzaVisualised.projector(
      mockPizzas[0],
      {
        1: mockToppings[0],
        2: mockToppings[1],
        3: mockToppings[2],
      },
      [1, 3]
    );

    expect(result).toEqual({
      ...mockPizzas[0],
      toppings: [mockToppings[0], mockToppings[2]],
    });
  });
});
