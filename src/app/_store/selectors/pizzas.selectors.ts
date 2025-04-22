import { createSelector } from '@ngrx/store';
import { pizzasFeature } from '../reducers/pizzas.reducers';
import { selectRouteParams } from '../router/selectors/router.selectors';

export const selectPizza = createSelector(
  pizzasFeature.selectEntities,
  selectRouteParams,
  (entities, { pizzaId }) => entities[pizzaId]
);
