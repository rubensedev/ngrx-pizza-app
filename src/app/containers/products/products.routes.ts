import { Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    providers: [provideHttpClient()],
    loadComponent: () =>
      import('./products.component').then((x) => x.ProductsComponent),
  },
];
