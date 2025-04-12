import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { PizzasService } from '../../_services/pizzas.service';
import { ToppingsService } from '../../_services/toppings.service';

// Components
import { PizzaDisplayComponent } from '../../components/pizza-display/pizza-display.component';
import { PizzaFormComponent } from '../../components/pizza-form/pizza-form.component';

// Interfaces
import { Pizza } from '../../_interfaces/pizza.interface';
import { Topping } from '../../_interfaces/topping.interface';

@Component({
  selector: 'product-item',
  imports: [PizzaFormComponent, PizzaDisplayComponent],
  providers: [PizzasService, ToppingsService],
  template: `
    <div class="product-item">
      <pizza-form
        [pizza]="pizza"
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
  pizza!: Pizza;
  visualise: Pizza = {};
  toppings!: Topping[];

  private readonly pizzasService = inject(PizzasService);
  private readonly toppingsService = inject(ToppingsService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.pizzasService.getPizzas().subscribe((pizzas) => {
      const param = this.route.snapshot.paramMap.get('id') as string;
      let pizza: Pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = pizzas.find(
          (pizza) => pizza.id == parseInt(param, 10)
        ) as Pizza;
      }
      this.pizza = pizza;
    });

    this.toppingsService.getToppings().subscribe((toppings) => {
      this.toppings = toppings;
      // this.onSelect(toppings.map((topping) => topping.id));
    });
  }

  onSelect(event: Topping['id'][]) {
    let toppings: Topping[];
    if (this.toppings && this.toppings.length) {
      toppings = event.map(
        (id) => this.toppings.find((topping) => topping.id === id) as Topping
      );
    } else {
      toppings = this.pizza.toppings as Topping[];
    }
    this.visualise = { ...this.pizza, toppings };
  }

  onCreate(event: Pizza) {
    this.pizzasService.createPizza(event).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  onUpdate(event: Pizza) {
    this.pizzasService.updatePizza(event).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzasService.deletePizza(event).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
