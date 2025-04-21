import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { filter, Observable } from 'rxjs';

// Store
import { Store } from '@ngrx/store';
import * as PizzasReducers from '../../_store/pizzas/reducers/pizzas.reducers';
import * as PizzasSelectors from '../../_store/pizzas/selectors/pizzas.selectors';
import * as ToppingsActions from '../../_store/toppings/actions/toppings.actions';

// Components
import { PizzaDisplayComponent } from '../../components/pizza-display/pizza-display.component';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';

// Interfaces
import { Pizza } from '../../_interfaces/pizza.interface';
import { Topping } from '../../_interfaces/topping.interface';
@Component({
  selector: 'product-item',
  imports: [AsyncPipe, PizzaFormComponent, PizzaDisplayComponent],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise"></pizza-display>
      </pizza-form>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .product-item {
      display: flex;
      justify-content: space-between;
    }
  `,
})
export class ProductItemComponent implements OnInit {
  pizza$!: Observable<Pizza>;
  visualise: Pizza = {};
  toppings!: Topping[];

  private readonly store = inject(Store<PizzasReducers.ProductsState>);

  ngOnInit(): void {
    this.pizza$ = this.store
      .select(PizzasSelectors.selectPizza)
      .pipe(filter((pizza): pizza is Pizza => !!pizza));
    // Which one is better?
    // this.pizza$ = this.store.select(PizzasSelectors.selectPizza) as Observable<Pizza>;

    this.store.dispatch(ToppingsActions.loadTopppings());
  }

  onSelect(event: Topping['id'][]) {}

  onCreate(event: Pizza) {}

  onUpdate(event: Pizza) {}

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
