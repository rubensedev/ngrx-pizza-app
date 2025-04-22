import { createSelector } from '@ngrx/store';

import * as PizzasReducers from '../reducers/pizzas.reducers';
import * as ToppingsReducers from '../reducers/toppings.reducers';
import * as RouterSelectors from '../router/selectors/router.selectors';

export const selectPizza = createSelector(
  PizzasReducers.pizzasFeature.selectEntities,
  RouterSelectors.selectRouteParams,
  (entities, { pizzaId }) => entities[pizzaId]
);

export const selectPizzaVisualised = createSelector(
  selectPizza,
  ToppingsReducers.toppingsFeature.selectEntities,
  ToppingsReducers.toppingsFeature.selectSelectedToppingsIds,
  (pizza, toppingEntities, selectedToppingsIds) => {
    const toppings = selectedToppingsIds.map((id) => toppingEntities[id!!]);
    return { ...pizza, toppings };
  }
);
