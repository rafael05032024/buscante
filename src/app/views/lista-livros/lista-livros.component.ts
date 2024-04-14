import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from '../../modes/interfaces';
import { LivroVolumeInfo } from '../../modes/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  campoBusca!: string;
  subs: Subscription[] = [];
  listaLivros!: Livro[];

  constructor(
    private service: LivroService
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  livrosResultadosParaLivros(items: Item[]) {
    return items.map((item) => new LivroVolumeInfo(item));
  }

  buscaLivros() {
    const sub = this
    .service
    .buscar(this.campoBusca)
    .subscribe({
      next: (response) => this.listaLivros = this.livrosResultadosParaLivros(response),
      error: (error) => console.error(error)
    });

    this.subs.push(sub);
  }
}



