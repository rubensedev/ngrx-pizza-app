import { Pizza } from './pizza.interface';

export interface PizzaState {
  pizzas: Pizza[];
  loading: boolean;
  loaded: boolean;
  error: any;
}
