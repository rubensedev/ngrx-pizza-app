import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./containers/products/products.routes').then(
        (x) => x.PRODUCTS_ROUTES
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: '**', redirectTo: 'products' },
];
