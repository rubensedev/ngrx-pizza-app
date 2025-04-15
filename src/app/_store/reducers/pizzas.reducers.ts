import { createFeature, createReducer, on } from '@ngrx/store';

import * as PizzasActions from '../actions/pizzas.actions';

import { PizzaState } from '../../_interfaces/pizza-state.interface';

const initialState: PizzaState = {
  pizzas: [],
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
