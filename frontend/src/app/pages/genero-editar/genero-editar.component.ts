import { ApiService } from './../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genero-editar',
  standalone: false,
  templateUrl: './genero-editar.component.html',
  styleUrls: ['./genero-editar.component.scss']
})
export class GeneroEditarComponent implements OnInit {
  generoId: String = '';
  generoForm!: FormGroup;
  nome: String = '';
  descricao: String = '';
  imagemUrl: String = '';

  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute,
     private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getGenero(this.route.snapshot.params['id']);
    this.generoForm = this.formBuilder.group({
   'generoId' : [null],  
   'nome' : [null, Validators.required],
   'descricao' : [null, Validators.required],
   'imagemUrl' : [null, Validators.required]
 });
 }

 getGenero(id: any) {
  this.api.getGenero(id).subscribe(data => {
    this.generoId = data.generoId;
    this.generoForm.setValue({
      generoId: data.generoId,
      nome: data.nome,
      descricao: data.descricao,
      imagemUrl : data.imagemUrl
    });
  });
}

updateGenero(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateGenero(this.generoId, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/genero-detalhe/' + this.generoId]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
 }
}