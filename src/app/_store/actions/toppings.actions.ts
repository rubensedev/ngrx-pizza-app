import { createAction, props } from '@ngrx/store';
import { Topping } from '../../_interfaces/topping.interface';

export const loadTopppings = createAction('[Toppings] Load Toppings');

export const loadToppingsSuccesss = createAction(
  '[Toppings] Load Toppings Success',
  props<{ toppings: Topping[] }>()
);

export const loadToppingsFail = createAction(
  '[Toppings] Load Toppings Fail',
  props<{ error: any }>()
);

export const visualiseToppings = createAction(
  '[Toppings] Visualise Toppings',
  props<{ selectedToppingsIds: Topping['id'][] }>()
);
