import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs';

import { PizzaToppingsComponent } from '../pizza-toppings/pizza-toppings.component';

// Interfaces
import { Pizza } from '../../_interfaces/pizza.interface';
import { Topping } from '../../_interfaces/topping.interface';

@Component({
  selector: 'pizza-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, PizzaToppingsComponent],
  template: `
    <div class="pizza-form">
      <form [formGroup]="form">
        <label>
          <h4>Pizza name</h4>
          <input
            type="text"
            formControlName="name"
            placeholder="e.g. Pepperoni"
            class="pizza-form__input"
            [class.error]="nameControlInvalid"
          />
          @if (nameControlInvalid) {
          <div class="pizza-form__error">
            <p>Pizza must have a name</p>
          </div>
          }
        </label>

        <ng-content></ng-content>

        <label>
          <h4>Select toppings</h4>
        </label>
        <div class="pizza-form__list">
          <pizza-toppings [toppings]="toppings" formControlName="toppings">
          </pizza-toppings>
        </div>

        <div class="pizza-form__actions">
          @if (!exists) {
          <button type="button" class="btn btn__ok" (click)="createPizza(form)">
            Create Pizza
          </button>
          } @else {
          <button type="button" class="btn btn__ok" (click)="updatePizza(form)">
            Save changes
          </button>
          <button
            type="button"
            class="btn btn__warning"
            (click)="removePizza(form)"
          >
            Delete Pizza
          </button>
          }
        </div>
      </form>
    </div>
  `,
  styles: `
    .pizza-form {
      ::ng-deep pizza-display {
        margin: 0 0 35px;
      }
      label {
        margin: 0 0 35px;
        display: block;
        h4 {
          margin: 0 0 15px;
        }
      }
      &__error {
        padding: 10px;
        border-radius: 0 0 4px 4px;
        display: flex;
        align-items: center;
        background: #aa141b;
        color: #fff;
        p {
          font: {
            size: 14px;
          }
          margin: 0;
        }
      }
      &__input {
        border: 0;
        margin: 0;
        padding: 15px;
        outline: 0;
        width: 100%;
        border-radius: 4px;
        font-size: 20px;
        font-weight: 600;
        background: #f5f5f5;
        border: 1px solid transparent;
        &.error {
          border-radius: 4px 4px 0 0;
          border-color: #b54846;
        }
      }
      &__actions {
        margin: 35px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          &:last-child {
            margin-left: auto;
          }
        }
      }
      &__list {
        margin: -20px 0 0;
      }
    }
  `,
})
export class PizzaFormComponent implements OnChanges {
  exists = false;

  @Input({ required: true }) pizza: Pizza | null = null;
  @Input({ required: true }) toppings!: Topping[];

  @Output() selected = new EventEmitter<Topping['id'][]>();
  @Output() create = new EventEmitter<Pizza>();
  @Output() update = new EventEmitter<Pizza>();
  @Output() remove = new EventEmitter<Pizza>();

  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    name: ['', Validators.required],
    toppings: [[] as Topping[]],
  });

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(): void {
    if (this.pizza && this.pizza.id) {
      this.exists = true;
      this.form.patchValue(this.pizza);
    }
    this.form
      .get('toppings')
      ?.valueChanges.pipe(
        map((toppings) => {
          return toppings ? toppings.map((topping: Topping) => topping.id) : [];
        })
      )
      .subscribe((toppingsIds: Topping['id'][]) =>
        this.selected.emit(toppingsIds)
      );
  }

  createPizza(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    } else {
      form.markAllAsTouched();
    }
  }

  updatePizza(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.pizza, ...value });
    } else {
      form.markAllAsTouched();
    }
  }

  removePizza(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.pizza, ...value });
  }
}
