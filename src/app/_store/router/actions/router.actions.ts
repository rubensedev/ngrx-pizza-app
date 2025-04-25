import { NavigationExtras } from '@angular/router';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const routerNavigateActions = createActionGroup({
  source: 'Router/Navigate',
  events: {
    Go: props<{ path: any[]; query?: object; extras?: NavigationExtras }>(),
    Back: emptyProps(),
    Forward: emptyProps(),
  },
});
