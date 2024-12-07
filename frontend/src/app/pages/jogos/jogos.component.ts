import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../../model/jogo';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-jogos',
  standalone: false,
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.scss'
})
export class JogosComponent implements OnInit{
  displayedColumns: string[] = [ 'titulo', 'preco', 'acao'];
  dataSource!: Jogo[];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getJogos()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
