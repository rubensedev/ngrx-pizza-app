import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from '../custom-serializer/router.serializer';

export const selectRouter =
  createFeatureSelector<RouterReducerState<CustomRouterState>>('router');

export const selectUrl = createSelector(selectRouter, (routerState) => {
  return routerState.state.url;
});

export const selectQueryParams = createSelector(
  selectRouter,
  (routerState) => routerState.state.queryParams
);

export const selectRouteParams = createSelector(
  selectRouter,
  (routerState) => routerState.state.params
);
