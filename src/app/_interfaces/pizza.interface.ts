import { Topping } from './topping.interface';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
