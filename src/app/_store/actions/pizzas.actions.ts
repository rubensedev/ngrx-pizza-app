import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Pizza } from '../../_interfaces/pizza.interface';

// load pizzas
export const loadPizzasActions = createActionGroup({
  source: 'Pizzas/Load',
  events: {
    Load: emptyProps(),
    Success: props<{ pizzas: Pizza[] }>(),
    Failure: props<{ error: any }>(),
  },
});

// Create pizza
export const createPizzaActions = createActionGroup({
  source: 'Pizzas/Create',
  events: {
    Create: props<{ pizza: Pizza }>(),
    Success: props<{ pizza: Pizza }>(),
    Failure: props<{ error: any }>(),
  },
});

// Update pizza
export const updatePizzaActions = createActionGroup({
  source: 'Pizzas/Update',
  events: {
    Update: props<{ update: Update<Pizza> }>(),
    Success: props<{ update: Update<Pizza> }>(),
    Failure: props<{ error: any }>(),
  },
});

// Delete pizza
export const deletePizzaActions = createActionGroup({
  source: 'Pizzas/Delete',
  events: {
    Delete: props<{ pizza: Pizza }>(),
    Success: props<{ pizza: Pizza }>(),
    Failure: props<{ error: any }>(),
  },
});
