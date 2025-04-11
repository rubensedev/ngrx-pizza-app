import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PizzaDisplayComponent } from '../pizza-display/pizza-display.component';

import { Pizza } from '../../_interfaces/pizza.interface';

@Component({
  selector: 'pizza-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PizzaDisplayComponent],
  template: `
    <div class="pizza-item">
      <a [routerLink]="['/products', pizza.id]">
        <pizza-display [pizza]="pizza"></pizza-display>
        <h4>{{ pizza.name }}</h4>
        <button type="button" class="btn btn__ok">View Pizza</button>
      </a>
    </div>
  `,
  styles: `
    .pizza-item {
      text-align: center;
      margin: 0 10px;
      padding: 20px 10px;
      border-radius: 4px;
      background: #f5f5f5;
      a {
        color: #333;
      }
      h4 {
        margin: 10px 0;
      }
      &__base {
        position: relative;
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
export class PizzaItemComponent {
  @Input({ required: true }) pizza!: Pizza;
}
