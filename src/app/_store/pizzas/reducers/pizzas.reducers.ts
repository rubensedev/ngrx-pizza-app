import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as PizzasActions from '../actions/pizzas.actions';

import { Pizza } from '../../../_interfaces/pizza.interface';
export interface ProductsState {
  pizzas: PizzaState;
}
export interface PizzaState extends EntityState<Pizza> {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const pizzaAdapter = createEntityAdapter<Pizza>();

const initialState: PizzaState = pizzaAdapter.getInitialState({
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
      pizzaAdapter.setAll(pizzas, {
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
    ...pizzaAdapter.getSelectors(selectPizzasState),
  }),
});
