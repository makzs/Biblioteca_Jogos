import { Genero } from './../../../model/genero';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genero-detalhe',
  standalone: false,
  templateUrl: './genero-detalhe.component.html',
  styleUrls: ['./genero-detalhe.component.scss']
})
export class GeneroDetalheComponent implements OnInit {
  genero: Genero = { generoId: '', nome: '', imagemUrl: ''};
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getGenero(this.route.snapshot.params['id']);
  }

  getGenero(id: any) {
    this.api.getGenero(id)
      .subscribe(data => {
        this.genero = data;
           console.log(this.genero);
             this.isLoadingResults = false;
      });
  }

  deleteGenero(id: any) {
    this.isLoadingResults = true;
    this.api.deleteGenero(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/generos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}