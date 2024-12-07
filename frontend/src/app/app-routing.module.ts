import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GenerosComponent } from './pages/generos/generos.component';
import { GeneroDetalheComponent } from './pages/genero-detalhe/genero-detalhe.component';
import { GeneroNovoComponent } from './pages/genero-novo/genero-novo.component';
import { GeneroEditarComponent } from './pages/genero-editar/genero-editar.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { JogosComponent } from './pages/jogos/jogos.component';
import { JogoDetalheComponent } from './pages/jogo-detalhe/jogo-detalhe.component';
import { JogoNovoComponent } from './pages/jogo-novo/jogo-novo.component';
import { JogoEditarComponent } from './pages/jogo-editar/jogo-editar.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Login'}
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {title: 'Logout'}
  },
  {
    path: 'generos',
    component: GenerosComponent,
    data: {title: 'Generos'}
  },
  {
    path: 'genero-detalhe/:id',
    component: GeneroDetalheComponent,
    data: {title: 'Detalhes do Genero'}
  },
  {
    path: 'genero-novo',
    component: GeneroNovoComponent,
    data: {title: 'Adicionar Genero'}
  },
  {
    path: 'genero-editar/:id',
    component: GeneroEditarComponent,
    data: {title: 'Editar Genero'}
  },
  {
    path: 'jogos',
    component: JogosComponent,
    data: {title: 'Jogos'}
  },
  {
    path: 'jogo-detalhe/:id',
    component: JogoDetalheComponent,
    data: {title: 'Detalhes do Jogo'}
  },
  {
    path: 'jogo-novo',
    component: JogoNovoComponent,
    data: {title: 'Adicionar Jogo'}
  },
  {
    path: 'jogo-editar/:id',
    component: JogoEditarComponent,
    data: {title: 'Editar Jogo'}
  },
  {
    path: '',
    redirectTo: '/generos',
    pathMatch: 'full',
    data: {title: 'full'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
