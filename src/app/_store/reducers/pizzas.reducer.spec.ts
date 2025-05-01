import { Update } from '@ngrx/entity';
import { pizzasFeature, pizzaAdapter, PizzaState } from './pizzas.reducers';
import * as PizzasActions from '../actions/pizzas.actions';

import { Pizza } from '../../_interfaces/pizza.interface';

describe('Pizzas Reducer', () => {
  let mockPizzas: Pizza[];
  let initialState: PizzaState;

  beforeEach(() => {
    mockPizzas = [
      { id: 1, name: 'Pepperoni', toppings: [] },
      { id: 2, name: 'Margarita', toppings: [] },
      { id: 3, name: 'Hawaiian', toppings: [] },
    ];

    initialState = pizzaAdapter.getInitialState({
      loading: false,
      loaded: false,
      error: null,
    });
  });

  it('should set loading true on load, create, update and delete actions', () => {
    const loadState = pizzasFeature.reducer(
      initialState,
      PizzasActions.loadPizzasActions.load()
    );
    const createState = pizzasFeature.reducer(
      initialState,
      PizzasActions.createPizzaActions.create({ pizza: mockPizzas[0] })
    );
    const updateState = pizzasFeature.reducer(
      initialState,
      PizzasActions.updatePizzaActions.update({
        update: { id: 1, changes: {} },
      })
    );
    const deleteState = pizzasFeature.reducer(
      initialState,
      PizzasActions.deletePizzaActions.delete({ pizza: mockPizzas[0] })
    );

    expect(loadState.loading).toBeTrue();
    expect(createState.loading).toBeTrue();
    expect(updateState.loading).toBeTrue();
    expect(deleteState.loading).toBeTrue();
  });

  it('should set error on failure actions, load, create, update and delete', () => {
    const error = { message: 'Action failed' };
    const loadState = pizzasFeature.reducer(
      initialState,
      PizzasActions.loadPizzasActions.failure({ error })
    );
    const createState = pizzasFeature.reducer(
      initialState,
      PizzasActions.createPizzaActions.failure({ error })
    );
    const updateState = pizzasFeature.reducer(
      initialState,
      PizzasActions.updatePizzaActions.failure({ error })
    );
    const deleteState = pizzasFeature.reducer(
      initialState,
      PizzasActions.deletePizzaActions.failure({ error })
    );

    expect(loadState.error).toEqual(error);
    expect(loadState.loading).toBeFalse();
    expect(createState.error).toEqual(error);
    expect(createState.loading).toBeFalse();
    expect(updateState.error).toEqual(error);
    expect(updateState.loading).toBeFalse();
    expect(deleteState.error).toEqual(error);
    expect(deleteState.loading).toBeFalse();
  });

  it('should set all pizzas on load success', () => {
    const state = pizzasFeature.reducer(
      initialState,
      PizzasActions.loadPizzasActions.success({ pizzas: mockPizzas })
    );

    expect(state.entities[1]).toEqual(mockPizzas[0]);
    expect(state.entities[2]).toEqual(mockPizzas[1]);
    expect(state.entities[3]).toEqual(mockPizzas[2]);
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
  });

  it('should set one pizza on create success', () => {
    const newPizza: Pizza = { id: 4, name: 'BBQ Chicken', toppings: [] };
    const state = pizzasFeature.reducer(
      initialState,
      PizzasActions.createPizzaActions.success({ pizza: newPizza })
    );

    expect(state.entities[4]).toEqual(newPizza);
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
  });

  it('should update one pizza on update success', () => {
    const updatedPizza: Update<Pizza> = {
      id: 1,
      changes: { name: 'Updated Pepperoni' },
    };

    const loadedState = pizzasFeature.reducer(
      initialState,
      PizzasActions.loadPizzasActions.success({ pizzas: mockPizzas })
    );
    const updatedState = pizzasFeature.reducer(
      loadedState,
      PizzasActions.updatePizzaActions.success({ update: updatedPizza })
    );

    expect(updatedState.entities[1]?.name).toBe(updatedPizza.changes.name);
    expect(updatedState.loading).toBeFalse();
    expect(updatedState.loaded).toBeTrue();
  });

  it('should delete one pizza on delete success', () => {
    const loadedState = pizzasFeature.reducer(
      initialState,
      PizzasActions.loadPizzasActions.success({ pizzas: mockPizzas })
    );
    const deletedState = pizzasFeature.reducer(
      loadedState,
      PizzasActions.deletePizzaActions.success({ pizza: mockPizzas[0] })
    );

    expect(deletedState.entities[1]).toBeUndefined();
    expect(deletedState.loading).toBeFalse();
    expect(deletedState.loaded).toBeTrue();
  });
});
