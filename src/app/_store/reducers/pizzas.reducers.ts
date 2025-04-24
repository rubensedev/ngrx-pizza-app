import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as PizzasActions from '../actions/pizzas.actions';

import { Pizza } from '../../_interfaces/pizza.interface';

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

    // common
    on(
      PizzasActions.loadPizzas,
      PizzasActions.createPizza,
      PizzasActions.updatePizza,
      (state) => ({
        ...state,
        loading: true,
        loaded: false,
      })
    ),

    // common - FAIL
    on(
      PizzasActions.loadPizzasFail,
      PizzasActions.createPizzaFail,
      PizzasActions.updatePizzaFail,
      (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error,
      })
    ),

    // load pizzas
    on(PizzasActions.loadPizzasSuccess, (state, { pizzas }) =>
      pizzaAdapter.setAll(pizzas, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    // create pizza
    on(PizzasActions.createPizzaSuccess, (state, { pizza }) =>
      // TODO: setOne or addOne
      pizzaAdapter.setOne(pizza, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    // update pizza
    on(PizzasActions.updatePizzaSuccess, (state, { update }) =>
      pizzaAdapter.updateOne(update, {
        ...state,
        loading: false,
        loaded: true,
      })
    )
  ),

  extraSelectors: ({ selectPizzasState }) => ({
    ...pizzaAdapter.getSelectors(selectPizzasState),
  }),
});
