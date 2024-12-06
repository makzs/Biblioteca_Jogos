import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerosComponent } from './pages/generos/generos.component';
import { GeneroDetalheComponent } from './pages/genero-detalhe/genero-detalhe.component';
import { GeneroNovoComponent } from './pages/genero-novo/genero-novo.component';
import { GeneroEditarComponent } from './pages/genero-editar/genero-editar.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerosComponent,
    GeneroDetalheComponent,
    GeneroNovoComponent,
    GeneroEditarComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
