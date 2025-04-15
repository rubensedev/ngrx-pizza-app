import { EntityState } from '@ngrx/entity';
import { Pizza } from './pizza.interface';

export interface PizzaState extends EntityState<Pizza> {
  loading: boolean;
  loaded: boolean;
  error: any;
}
