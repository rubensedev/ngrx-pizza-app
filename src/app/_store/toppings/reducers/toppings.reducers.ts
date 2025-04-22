import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as ToppingsActions from '../actions/toppings.actions';

import { Topping } from '../../../_interfaces/topping.interface';

export interface ToppingsState extends EntityState<Topping> {
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const toppingAdapter = createEntityAdapter<Topping>();

const initialState: ToppingsState = toppingAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null,
});

export const toppingsFeature = createFeature({
  name: 'toppings',
  reducer: createReducer(
    initialState,

    on(ToppingsActions.loadTopppings, (state) => ({
      ...state,
      loading: true,
    })),

    on(ToppingsActions.loadToppingsSuccesss, (state, { toppings }) =>
      toppingAdapter.setAll(toppings, {
        ...state,
        loading: false,
        loaded: true,
      })
    ),

    on(ToppingsActions.loadToppingsFail, (state, { error }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }))
  ),

  extraSelectors: ({ selectToppingsState }) => ({
    ...toppingAdapter.getSelectors(selectToppingsState),
  }),
});
