import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';

import * as PizzasActions from '../actions/pizzas.actions';

import { Pizza } from '../../_interfaces/pizza.interface';
import { PizzaState } from '../../_interfaces/pizza-state.interface';

export const adapter = createEntityAdapter<Pizza>();

const initialState: PizzaState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

export const pizzasFeature = createFeature({
  name: 'pizzas',
  reducer: createReducer(
    initialState,

    on(PizzasActions.loadPizzas, (state) => ({
      ...state,
      loading: true,
    })),

    on(PizzasActions.loadPizzasSuccess, (state, { pizzas }) =>
      adapter.setAll(pizzas, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    on(PizzasActions.loadPizzasFail, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }))
  ),

  extraSelectors: ({ selectPizzasState }) => ({
    ...adapter.getSelectors(selectPizzasState),
  }),
});
