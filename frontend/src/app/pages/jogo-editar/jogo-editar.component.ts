import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Jogo } from '../../../model/jogo';

@Component({
  selector: 'app-jogo-editar',
  standalone: false,
  templateUrl: './jogo-editar.component.html',
  styleUrl: './jogo-editar.component.scss'
})
export class JogoEditarComponent implements OnInit {
  jogoId: String = '';
  jogoForm!: FormGroup;
  titulo: String = '';
  plataformas: String = '';
  ano: string = '';
  preco: string = '';
  imagemUrl: String = '';
  generoId: string = '';

  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute,
     private api: ApiService, private formBuilder: FormBuilder) { }

     ngOnInit() {
      this.getJogo(this.route.snapshot.params['id']);
      this.jogoForm = this.formBuilder.group({
        'jogoId' : [null],  
        'titulo' : [null, Validators.required],
        'plataformas' : [null, Validators.required],
        'ano' : [null, Validators.required],
        'preco' : [null, Validators.required],
        'imagemUrl' : [null, Validators.required],
        'generoId' : [null, Validators.required]
    });
    }

    getJogo(id: any){
      this.api.getJogo(id).subscribe(data =>{
        this.jogoId = data.jogoId;
        this.jogoForm.setValue({
          jogoId: data.jogoId,
          titulo: data.titulo,
          plataformas: data.plataformas,
          ano: data.ano,
          preco: data.preco,
          imagemUrl: data.imagemUrl,
          generoId: data.generoId
        });
      });
    }

    updateJogo(form: NgForm) {
      this.isLoadingResults = true;
      this.api.updateJogo(this.jogoId, form)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/jogo-detalhe/' + this.jogoId]);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
     }
}
