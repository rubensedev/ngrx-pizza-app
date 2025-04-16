import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../../_interfaces/pizza.interface';

export const loadPizzas = createAction('[Pizzas] Load Pizzas');

export const loadPizzasSuccess = createAction(
  '[Pizzas] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);

export const loadPizzasFail = createAction(
  '[Pizzas] Load Pizzas Fail',
  props<{ error: any }>()
);
