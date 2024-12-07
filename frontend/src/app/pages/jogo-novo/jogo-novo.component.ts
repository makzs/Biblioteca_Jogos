import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-jogo-novo',
  standalone: false,
  templateUrl: './jogo-novo.component.html',
  styleUrl: './jogo-novo.component.scss'
})
export class JogoNovoComponent implements OnInit{
  jogoForm!: FormGroup;
  titulo: String = '';
  plataformas: String = '';
  ano: string = '';
  preco: string = '';
  imagemUrl: String = '';
  generoId: string = '';

  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder,  private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.jogoForm = this.formBuilder.group({
      'titulo' : [null, Validators.required],
      'plataformas' : [null, Validators.required],
      'ano' : [null, Validators.required],
      'preco' : [null, Validators.required],
      'imagemUrl' : [null, Validators.required],
      'generoId' : [null, Validators.required]
  });
  }

  addJogo(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addJogo(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.snackBar.open('Jogo adicionado com sucesso!', 'Fechar', {
          duration: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/jogos']);
        }, 3000);
      },
      err => {
        this.isLoadingResults = false;
        console.log(err);
        if (err.status === 401) {
          this.snackBar.open('Erro: Usuário não está logado.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('Erro ao adicionar o jogo. Tente novamente.', 'Fechar', {
            duration: 3000
          });
        }
      }
    );
  }
  
}
