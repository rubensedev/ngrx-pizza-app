import { Routes } from '@angular/router';

export const PRODUCT_ITEM_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./product-item.component').then((x) => x.ProductItemComponent),
  },
];
