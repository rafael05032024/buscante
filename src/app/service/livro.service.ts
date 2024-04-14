import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import { Item, LivrosResultado } from '../modes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private baseUrl = 'https://www.googleapis.com/books/v1';

  constructor(
    private http: HttpClient
  ) { }

  buscar(q: string): Observable<Item[]> {
    const url = `${this.baseUrl}/volumes`;
    const params = new HttpParams().append('q', q);

    return this.http.get<LivrosResultado>(url, { params })
    .pipe(
      tap((apiReturn) => {
        const { items } = apiReturn;
        console.log({ items });

        return '';
      }),
      map((apiReturn) => apiReturn.items),
      tap((r) => console.log(r))
    );
  }
}
