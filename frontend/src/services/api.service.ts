import { Usuario } from './../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Genero } from '../model/genero';
import { Jogo } from '../model/jogo';

const generosUrl = 'http://localhost:5201/api/generos';
const jogosUrl = 'http://localhost:5201/api/jogos';
const apiLoginUrl = 'http://localhost:5201/api/Auth/login';
var token = '';
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Autenticação
  montaHeaderToken() {
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem("jwt") || "";
      console.log('jwt header token ' + token);
      httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token, "Content-Type": "application/json"})};
    }
    
  }

  Login (Usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => console.log(`login com usuario =${Usuario.UserName}`)),
      catchError(this.handleError<Usuario>('Login'))
    )
  }

  // CRUD Generos
  getGeneros (): Observable<Genero[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Genero[]>(generosUrl, httpOptions)
      .pipe(
        tap(Generos => console.log('leu os Generos')),
        catchError(this.handleError('getGeneros', []))
      );
  }

  getGenero(id: number): Observable<Genero> {
    const url = `${generosUrl}/${id}`;
    return this.http.get<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Genero id=${id}`)),
      catchError(this.handleError<Genero>(`getGenero id=${id}`))
    );
  }

  addGenero (Genero: any): Observable<Genero> {
    this.montaHeaderToken();
    return this.http.post<Genero>(generosUrl, Genero, httpOptions).pipe(
      tap((Genero: Genero) => console.log(`adicionou o Genero com w/ id=${Genero.generoId}`)),
      catchError(this.handleError<Genero>('addGenero'))
    );
  }

  updateGenero(id: any, Genero: any): Observable<any> {
    const url = `${generosUrl}/${id}`;
    return this.http.put(url, Genero, httpOptions).pipe(
      tap(_ => console.log(`atualiza o genero com id=${id}`)),
      catchError(this.handleError<any>('updateGenero'))
    );
  }

  deleteGenero (id: any): Observable<Genero> {
    const url = `${generosUrl}/${id}`;
    return this.http.delete<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Genero com id=${id}`)),
      catchError(this.handleError<Genero>('deleteGenero'))
    );
  }

  // CRUD Jogos
  getJogos (): Observable<Jogo[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Jogo[]>(jogosUrl, httpOptions)
      .pipe(
        tap(Jogos => console.log('leu os Jogos')),
        catchError(this.handleError('getJogos', []))
      );
  }

  addJogo (Jogo: any): Observable<Jogo> {
    this.montaHeaderToken();
    return this.http.post<Jogo>(jogosUrl, Jogo, httpOptions).pipe(
      tap((Jogo: Jogo) => console.log(`adicionou o Jogo com w/ id=${Jogo.jogoId}`)),
      catchError(this.handleError<Jogo>('addJogo'))
    );
  }

  updateJogo(id: any, Jogo: any): Observable<any> {
    const url = `${jogosUrl}/${id}`;
    return this.http.put(url, Jogo, httpOptions).pipe(
      tap(_ => console.log(`atualiza o jogo com id=${id}`)),
      catchError(this.handleError<any>('updateJogo'))
    );
  }

  getJogo(id: number): Observable<Jogo> {
    const url = `${jogosUrl}/${id}`;
    return this.http.get<Jogo>(url, httpOptions).pipe(
      tap(_ => console.log(`leu o Jogo id=${id}`)),
      catchError(this.handleError<Jogo>(`getJogo id=${id}`))
    );
  }

  deleteJogo (id: any): Observable<Jogo> {
    const url = `${jogosUrl}/${id}`;
    return this.http.delete<Jogo>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Jogo com id=${id}`)),
      catchError(this.handleError<Jogo>('deleteJogo'))
    );
  }

  // tratamento de erros
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
