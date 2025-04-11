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
  // it's relative to the parent, so lazy-load the relative children
  {
    path: '',
    providers: [provideHttpClient()],
    loadChildren: () =>
      import('../product-item/product-item.routes').then(
        (x) => x.PRODUCT_ITEM_ROUTES
      ),
  },
];
