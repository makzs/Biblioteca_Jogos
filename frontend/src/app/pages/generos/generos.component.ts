import { ApiService } from './../../../services/api.service';
import { Genero } from './../../../model/genero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generos',
  standalone: false,
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent implements OnInit {
  displayedColumns: string[] = [ 'nome', 'imagem','acao'];
  dataSource!: Genero[];
  isLoadingResults = true;
  
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getGeneros()
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
