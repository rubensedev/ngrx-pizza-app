import { Topping } from '../../_interfaces/topping.interface';
import {
  toppingAdapter,
  toppingsFeature,
  ToppingState,
} from './toppings.reducers';
import * as ToppingsActions from '../actions/toppings.actions';

describe('Toppings Reducer', () => {
  let mockToppings: Topping[];
  let initialState: ToppingState;

  beforeEach(() => {
    mockToppings = [
      { id: 1, name: 'Cheese' },
      { id: 2, name: 'Pepperoni' },
      { id: 3, name: 'Mushrooms' },
    ];

    initialState = toppingAdapter.getInitialState({
      loading: false,
      loaded: false,
      error: null,
      selectedToppingsIds: [],
    });
  });

  it('should set loading true on load', () => {
    const state = toppingsFeature.reducer(
      initialState,
      ToppingsActions.loadToppingsActions.load()
    );

    expect(state.loading).toBeTrue();
  });

  it('should populate toppings on success', () => {
    const state = toppingsFeature.reducer(
      initialState,
      ToppingsActions.loadToppingsActions.success({ toppings: mockToppings })
    );

    expect(state.entities[1]).toEqual(mockToppings[0]);
    expect(state.entities[2]).toEqual(mockToppings[1]);
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
  });

  it('should set error on failure', () => {
    const error = { message: 'Load failed' };
    const state = toppingsFeature.reducer(
      initialState,
      ToppingsActions.loadToppingsActions.failure({ error })
    );

    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeFalse();
    expect(state.error).toEqual(error);
  });

  it('should update selectedToppingsIds on visualise action', () => {
    const selectedIds = [1, 3];
    const state = toppingsFeature.reducer(
      initialState,
      ToppingsActions.visualiseToppingsAction({
        selectedToppingsIds: selectedIds,
      })
    );

    expect(state.selectedToppingsIds).toEqual(selectedIds);
  });
});
