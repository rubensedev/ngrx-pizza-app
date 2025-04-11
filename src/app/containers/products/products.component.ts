import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PizzasService } from '../../_services/pizzas.service';

import { PizzaItemComponent } from '../../components/pizza-item/pizza-item.component';

import { Pizza } from '../../_interfaces/pizza.interface';

@Component({
  selector: 'products',
  imports: [RouterLink, PizzaItemComponent],
  providers: [PizzasService],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new"> New Pizza </a>
      </div>
      <div class="products__list">
        @if (!pizzas.length) {
        <div>No pizzas, add one to get started.</div>
        } @else { @for (pizza of pizzas; track pizza.id) {
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
  pizzas: Pizza[] = [];

  private readonly pizzasService = inject(PizzasService);

  ngOnInit(): void {
    this.pizzasService
      .getPizzas()
      .subscribe((pizzas) => (this.pizzas = pizzas));
  }
}
