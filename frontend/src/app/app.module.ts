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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenuComponent } from './pages/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { JogosComponent } from './pages/jogos/jogos.component';
import { JogoDetalheComponent } from './pages/jogo-detalhe/jogo-detalhe.component';
import { JogoNovoComponent } from './pages/jogo-novo/jogo-novo.component';
import { JogoEditarComponent } from './pages/jogo-editar/jogo-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerosComponent,
    GeneroDetalheComponent,
    GeneroNovoComponent,
    GeneroEditarComponent,
    LoginComponent,
    LogoutComponent,
    JogosComponent,
    JogoDetalheComponent,
    JogoNovoComponent,
    JogoEditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MenuComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
