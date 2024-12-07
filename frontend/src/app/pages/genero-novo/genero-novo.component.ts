import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genero-novo',
  standalone: false,
  templateUrl: './genero-novo.component.html',
  styleUrls: ['./genero-novo.component.scss']
})
export class GeneroNovoComponent implements OnInit {
  generoForm!: FormGroup;
  nome: String = '';
  descricao: String = '';
  imagemUrl: String = '';

  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
     this.generoForm = this.formBuilder.group({
    'nome' : [null, Validators.required],
    'descricao' : [null, Validators.required],
    'imagemUrl' : [null, Validators.required]
  });
  }

  addGenero(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addGenero(form).subscribe(
      res => {
        this.isLoadingResults = false;
        this.snackBar.open('Gênero adicionado com sucesso!', 'Fechar', {
          duration: 3000
        });
        setTimeout(() => {
          this.router.navigate(['/generos']);
        }, 3000);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
        if (err.status === 401) {
          this.snackBar.open('Erro: Usuário não está logado.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('Erro ao adicionar o gênero. Tente novamente.', 'Fechar', {
            duration: 3000
          });
        }
      }
    );
  }
  
}
