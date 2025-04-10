import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { handleError } from '../_utils';

import { Pizza } from '../_interfaces/pizza.interface';

@Injectable()
export class PizzasService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = environment.config.API_URL_PIZZAS;

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.API_URL).pipe(catchError(handleError));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(this.API_URL, payload)
      .pipe(catchError(handleError));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`${this.API_URL}/${payload.id}`, payload)
      .pipe(catchError(handleError));
  }

  deletePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`${this.API_URL}/${payload.id}`)
      .pipe(catchError(handleError));
  }
}
