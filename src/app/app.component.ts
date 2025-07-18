import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app">
      <div class="app__header">
        <img src="/assets/img/logo.svg" class="app__logo" />
      </div>
      <div class="app__content">
        <div class="app__nav">
          <a routerLink="products" routerLinkActive="active">Products</a>
        </div>
        <div class="app__container">
          <router-outlet />
        </div>
        <div class="app__footer">
          <p>&copy; Ultimate Pizza Inc.</p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
