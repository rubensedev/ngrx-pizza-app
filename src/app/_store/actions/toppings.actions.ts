import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Topping } from '../../_interfaces/topping.interface';

export const loadToppingsActions = createActionGroup({
  source: 'Toppings/Load',
  events: {
    Load: emptyProps(),
    Success: props<{ toppings: Topping[] }>(),
    Failure: props<{ error: any }>(),
  },
});

export const visualiseToppingsAction = createAction(
  '[Toppings/Visualise] Visualise',
  props<{ selectedToppingsIds: Topping['id'][] }>()
);
