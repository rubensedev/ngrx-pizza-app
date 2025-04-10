import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { handleError } from '../_utils';

import { Topping } from '../_interfaces/topping.interface';

@Injectable()
export class ToppingsService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.config.API_URL_PIZZAS;

  getToppings(): Observable<Topping[]> {
    return this.http.get<Topping[]>(this.API_URL).pipe(catchError(handleError));
  }
}
