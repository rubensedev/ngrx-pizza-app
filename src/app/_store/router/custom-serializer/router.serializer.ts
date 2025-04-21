import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Params,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface CustomRouterState {
  url: string;
  queryParams: Params;
  params: Params;
}

export class CustomRouteSerializer
  implements RouterStateSerializer<CustomRouterState>
{
  serialize(routerState: RouterStateSnapshot): CustomRouterState {
    let route: ActivatedRouteSnapshot = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    return {
      url,
      queryParams,
      params,
    };
  }
}
