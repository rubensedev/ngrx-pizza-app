import { PizzaState } from './pizzas.reducers';
import { ToppingState } from './toppings.reducers';

export interface ProductsState {
  pizzas: PizzaState;
  toppings: ToppingState;
}
