import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
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

// Update pizza
export const updatePizza = createAction(
  '[Pizzas] Update Pizza',
  props<{ update: Update<Pizza> }>()
);
export const updatePizzaSuccess = createAction(
  '[Pizzas] Update Pizza Success',
  props<{ update: Update<Pizza> }>()
);
export const updatePizzaFail = createAction(
  '[Pizzas] Update Pizza Fail',
  props<{ error: any }>()
);

// Delete pizza
export const deletePizza = createAction(
  '[Pizzas] Delete Pizza',
  props<{ pizza: Pizza }>()
);
export const deletePizzaSuccess = createAction(
  '[Pizzas] Delete Pizza Success',
  props<{ pizza: Pizza }>()
);
export const deletePizzaFail = createAction(
  '[Pizzas] Delete Pizza Fail',
  props<{ error: any }>()
);
