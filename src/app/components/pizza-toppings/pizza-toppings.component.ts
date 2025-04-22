import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { provideValueAccessor } from '../../_utils';

import { Topping } from '../../_interfaces/topping.interface';

@Component({
  selector: 'pizza-toppings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(PizzaToppingsComponent)],
  template: `
    <div class="pizza-toppings">
      @for (topping of toppings; track topping.id) {
      <div
        class="pizza-toppings-item"
        (click)="selectTopping(topping)"
        [class.active]="existsInToppings(topping)"
      >
        <img [src]="'/assets/img/toppings/singles/' + topping.name + '.svg'" />
        {{ topping.name }}
      </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pizza-toppings {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        margin: 0 0 10px;
        border-radius: 4px;
        font-size: 15px;
        border: 1px solid #e4e4e4;
        flex: 0 0 23%;
        transition: all 0.2s ease;
        cursor: pointer;
        &.active {
          background: #f5f5f5;
          &:after {
            content: '';
            border-radius: 50%;
            background: #19b55f url(/assets/img/actions/checked.svg) no-repeat
              center center;
            width: 16px;
            height: 16px;
            position: absolute;
            top: -5px;
            right: -5px;
            background-size: 10px;
          }
        }
        img {
          width: 22px;
          margin: 0 10px 0 0;
        }
      }
    }
  `,
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  @Input() toppings: Topping[] | null = [];

  value: Topping[] = [];

  private onTouch!: () => void;
  private onModelChange!: (value: Topping[]) => void;

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  registerOnChange(fn: (value: Topping[]) => void): void {
    this.onModelChange = fn;
  }

  writeValue(value: Topping[]): void {
    this.value = value;
  }

  selectTopping(topping: Topping) {
    if (this.existsInToppings(topping)) {
      this.value = this.value.filter((item) => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInToppings(topping: Topping): boolean {
    return this.value.some((val) => val.id === topping.id);
  }
}
