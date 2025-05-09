import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { filter, Observable, tap } from 'rxjs';

// Store
import { Store } from '@ngrx/store';
import { ProductsState } from '../../_store/reducers';
import * as PizzasSelectors from '../../_store/selectors/pizzas.selectors';
import * as PizzasActions from '../../_store/actions/pizzas.actions';
import * as ToppingsActions from '../../_store/actions/toppings.actions';
import * as ToppingsReducers from '../../_store/reducers/toppings.reducers';

// Components
import { PizzaDisplayComponent } from '../../components/pizza-display/pizza-display.component';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';

// Interfaces
import { Pizza } from '../../_interfaces/pizza.interface';
import { Topping } from '../../_interfaces/topping.interface';
@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, PizzaFormComponent, PizzaDisplayComponent],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)"
      >
        <pizza-display [pizza]="visualise$ | async"></pizza-display>
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
  visualise$!: Observable<Pizza>;
  toppings$!: Observable<Topping[]>;

  private readonly store = inject(Store<ProductsState>);

  ngOnInit(): void {
    this.pizza$ = this.store.select(PizzasSelectors.selectPizza).pipe(
      tap((pizza) => {
        const toppingsIds: Topping['id'][] =
          pizza?.toppings?.map((toppings) => toppings.id) ?? [];
        this.store.dispatch(
          ToppingsActions.visualiseToppingsAction({
            selectedToppingsIds: toppingsIds,
          })
        );
      }),
      filter((pizza): pizza is Pizza => !!pizza)
    );

    this.toppings$ = this.store.select(
      ToppingsReducers.toppingsFeature.selectAll
    );
    this.visualise$ = this.store.select(
      PizzasSelectors.selectPizzaVisualised
    ) as Observable<Pizza>;
  }

  onSelect(event: Topping['id'][]) {
    this.store.dispatch(
      ToppingsActions.visualiseToppingsAction({ selectedToppingsIds: event })
    );
  }

  onCreate(event: Pizza) {
    this.store.dispatch(
      PizzasActions.createPizzaActions.create({ pizza: event })
    );
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(
      PizzasActions.updatePizzaActions.update({
        update: { id: event.id as number, changes: event },
      })
    );
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(
        PizzasActions.deletePizzaActions.delete({ pizza: event })
      );
    }
  }
}
