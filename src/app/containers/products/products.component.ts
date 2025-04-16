import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as PizzasReducers from '../../_store/pizzas/reducers/pizzas.reducers';
import * as PizzasActtions from '../../_store/pizzas/actions/pizzas.actions';

import { PizzasService } from '../../_services/pizzas.service';

import { PizzaItemComponent } from '../../components/pizza-item/pizza-item.component';

import { Pizza } from '../../_interfaces/pizza.interface';

@Component({
  selector: 'products',
  imports: [RouterLink, AsyncPipe, PizzaItemComponent],
  providers: [PizzasService],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" [routerLink]="['new']"> New Pizza </a>
      </div>
      <div class="products__list">
        @if (!(pizzas$ | async)?.length) {
        <div>No pizzas, add one to get started.</div>
        } @else { @for (pizza of (pizzas$ | async); track pizza.id) {
        <pizza-item [pizza]="pizza"></pizza-item>
        } }
      </div>
    </div>
  `,
  styles: `
  :host {
    display: block;
  }
  .products {
    position: relative;
    &__new {
      margin: -35px -35px 35px;
      background: #f9f9f9;
      padding: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__list {
      display: flex;
      flex-wrap: wrap;
      pizza-item {
        background: #fff;
        flex: 0 0 33%;
        margin: 0 0 55px;
        transition: 0.2s all ease;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
`,
})
export class ProductsComponent implements OnInit {
  pizzas$!: Observable<Pizza[]>;

  private readonly store = inject(Store<PizzasReducers.ProductsState>);

  ngOnInit(): void {
    this.pizzas$ = this.store.select(PizzasReducers.pizzasFeature.selectAll);
    this.store.dispatch(PizzasActtions.loadPizzas());
  }
}
