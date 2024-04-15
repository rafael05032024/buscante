import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Subscription,
  switchMap,
  map,
  tap,
  filter,
  debounceTime,
  catchError,
  EMPTY,
  throwError
} from 'rxjs';

import { Item, Livro } from '../../modes/interfaces';
import { LivroVolumeInfo } from '../../modes/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {
  campoBusca = new FormControl('');
  mensgemErro = '';
  subs: Subscription[] = [];
  qtdeResultadosEncontrados!: number;
  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    catchError((error) => {
      console.error(error);

      this.mensgemErro = 'Deu ruim sua pesquisa recarregue a aplicação!';

      return throwError(() => new Error('Deu ruim!'));
    }),
    tap(() => console.log('requesting server...')),
    map(({ items, totalItems }) => {
      this.qtdeResultadosEncontrados = totalItems;

      return items ?? [];
    }),
    map((items) => this.livrosResultadosParaLivros(items)),
  );

  constructor(
    private service: LivroService
  ) { }

  livrosResultadosParaLivros(items: Item[]) {
    return items.map((item) => new LivroVolumeInfo(item));
  }
}
