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
      PizzasActions.loadPizzasActions.load,
      PizzasActions.createPizzaActions.create,
      PizzasActions.updatePizzaActions.update,
      (state) => ({
        ...state,
        loading: true,
        loaded: false,
      })
    ),

    // common - FAIL
    on(
      PizzasActions.loadPizzasActions.failure,
      PizzasActions.createPizzaActions.failure,
      PizzasActions.updatePizzaActions.failure,
      (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error,
      })
    ),

    // load pizzas
    on(PizzasActions.loadPizzasActions.success, (state, { pizzas }) =>
      pizzaAdapter.setAll(pizzas, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    // create pizza
    on(PizzasActions.createPizzaActions.success, (state, { pizza }) =>
      // TODO: setOne or addOne
      pizzaAdapter.setOne(pizza, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    // update pizza
    on(PizzasActions.updatePizzaActions.success, (state, { update }) =>
      pizzaAdapter.updateOne(update, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    // delete pizza
    on(PizzasActions.deletePizzaActions.success, (state, { pizza }) =>
      pizzaAdapter.removeOne(pizza.id as number, {
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
