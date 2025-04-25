import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as ToppingsActions from '../actions/toppings.actions';

import { Topping } from '../../_interfaces/topping.interface';

export interface ToppingState extends EntityState<Topping> {
  loading: boolean;
  loaded: boolean;
  error: any;
  selectedToppingsIds: Topping['id'][];
}

export const toppingAdapter = createEntityAdapter<Topping>();

const initialState: ToppingState = toppingAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
  selectedToppingsIds: [],
});

export const toppingsFeature = createFeature({
  name: 'toppings',
  reducer: createReducer(
    initialState,

    on(ToppingsActions.loadToppingsActions.load, (state) => ({
      ...state,
      loading: true,
    })),

    on(ToppingsActions.loadToppingsActions.success, (state, { toppings }) =>
      toppingAdapter.setAll(toppings, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    on(ToppingsActions.loadToppingsActions.failure, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })),

    on(
      ToppingsActions.visualiseToppingsAction,
      (state, { selectedToppingsIds }) => ({
        ...state,
        selectedToppingsIds,
      })
    )
  ),

  extraSelectors: ({ selectToppingsState }) => ({
    ...toppingAdapter.getSelectors(selectToppingsState),
  }),
});
