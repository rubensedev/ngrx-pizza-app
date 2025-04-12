import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { handleError } from '../_utils';

import { Pizza } from '../_interfaces/pizza.interface';

@Injectable()
export class PizzasService {
  private readonly http = inject(HttpClient);
  private readonly API_URL_GET_AND_POST =
    environment.config.API_URL_PIZZAS_GET_AND_POST;
  private readonly API_URL_PUT_DELETE =
    environment.config.API_URL_PIZZAS_PUT_AND_DELETE;

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(this.API_URL_GET_AND_POST)
      .pipe(catchError(handleError));
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(this.API_URL_GET_AND_POST, payload)
      .pipe(catchError(handleError));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`${this.API_URL_PUT_DELETE}/${payload.id}`, payload)
      .pipe(catchError(handleError));
  }

  deletePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`${this.API_URL_PUT_DELETE}/${payload.id}`)
      .pipe(catchError(handleError));
  }
}
