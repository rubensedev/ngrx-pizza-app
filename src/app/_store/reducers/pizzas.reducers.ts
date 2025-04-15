import { createFeature, createReducer, on } from '@ngrx/store';

import * as PizzasActions from '../actions/pizzas.actions';

import { PizzaState } from '../../_interfaces/pizza-state.interface';

const initialState: PizzaState = {
  pizzas: [
    {
      name: "Blazin' Inferno",
      toppings: [
        {
          id: 10,
          name: 'pepperoni',
        },
        {
          id: 9,
          name: 'pepper',
        },
        {
          id: 3,
          name: 'basil',
        },
        {
          id: 4,
          name: 'chili',
        },
        {
          id: 7,
          name: 'olive',
        },
        {
          id: 2,
          name: 'bacon',
        },
      ],
      id: 1,
    },
  ],
  loading: false,
  loaded: false,
  error: null,
};

export const pizzasFeature = createFeature({
  name: 'pizzas',
  reducer: createReducer(
    initialState,
    on(PizzasActions.loadPizzas, (state) => ({ ...state, loading: true })),
    on(PizzasActions.loadPizzasSuccess, (state, { pizzas }) => ({
      ...state,
      pizzas,
      loading: false,
      loaded: true,
    })),
    on(PizzasActions.loadPizzasFail, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }))
  ),
});
