import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

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
    this.api.addJogo(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/jogos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
