import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { DROP_INGREDIENTS } from '../../_utils';

import { Pizza } from '../../_interfaces/pizza.interface';

@Component({
  selector: 'pizza-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [DROP_INGREDIENTS],
  template: `
    <div class="pizza-display">
      <div class="pizza-display__base">
        <img src="/assets/img/pizza.svg" />
        @for (topping of pizza?.toppings; let i = $index; track pizza?.id) {
        <img
          [src]="'/assets/img/toppings/' + topping.name + '.svg'"
          [style.zIndex]="i"
          class="pizza-display__topping"
          @dropIngredients
        />
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pizza-display {
      background: #f5f5f5;
      border-radius: 4px;
      padding: 15px 0;
      &__base {
        position: relative;
        text-align: center;
      }
      &__topping {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
      }
    }
  `,
})
export class PizzaDisplayComponent {
  @Input({ required: true }) pizza: Pizza | null = {};
}
