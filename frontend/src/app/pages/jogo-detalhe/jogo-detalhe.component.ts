import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../../model/jogo';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-jogo-detalhe',
  standalone: false,
  templateUrl: './jogo-detalhe.component.html',
  styleUrl: './jogo-detalhe.component.scss'
})
export class JogoDetalheComponent implements OnInit{
  jogo: Jogo = { jogoId: '', titulo: '', plataformas: '', ano: '', preco: '', imagemUrl: '', generoId: ''}
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.getJogo(this.route.snapshot.params['id']);
  }

  getJogo(id: any) {
    this.api.getJogo(id)
      .subscribe(data => {
        this.jogo = data;
           console.log(this.jogo);
             this.isLoadingResults = false;
      });
  }

  deleteJogo(id: any) {
    this.isLoadingResults = true;
    this.api.deleteJogo(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/jogos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
