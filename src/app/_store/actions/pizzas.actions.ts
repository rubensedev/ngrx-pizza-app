import { createAction, props } from '@ngrx/store';
import { Pizza } from '../../_interfaces/pizza.interface';

// load pizzas
export const loadPizzas = createAction('[Pizzas] Load Pizzas');
export const loadPizzasSuccess = createAction(
  '[Pizzas] Load Pizzas Success',
  props<{ pizzas: Pizza[] }>()
);
export const loadPizzasFail = createAction(
  '[Pizzas] Load Pizzas Fail',
  props<{ error: any }>()
);

// Create pizza
export const createPizza = createAction(
  '[Pizzas] Create Pizza',
  props<{ pizza: Pizza }>()
);
export const createPizzaSuccess = createAction(
  '[Pizzas] Create Pizza Success',
  props<{ pizza: Pizza }>()
);
export const createPizzaFail = createAction(
  '[Pizzas] Create Pizza Fail',
  props<{ error: any }>()
);
