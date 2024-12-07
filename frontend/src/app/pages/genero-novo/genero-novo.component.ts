import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.generoForm = this.formBuilder.group({
    'nome' : [null, Validators.required],
    'descricao' : [null, Validators.required],
    'imagemUrl' : [null, Validators.required]
  });
  }

  addGenero(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addGenero(form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/generos']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
