import { Usuario } from './../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Genero } from '../model/genero';

const apiUrl = '';
const apiLoginUrl = '';
var token = '';
var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  montaHeaderToken() {
    token = localStorage.getItem("jwt") || "";
    console.log('jwt header token ' + token);
    httpOptions = {headers: new HttpHeaders({"Authorization": "Bearer " + token, "Content-Type": "application/json"})};
  }

  Login (Usuario: any): Observable<Usuario> {
    return this.http.post<Usuario>(apiLoginUrl, Usuario).pipe(
      tap((Usuario: Usuario) => console.log(`login com email =${Usuario.email}`)),
      catchError(this.handleError<Usuario>('Login'))
    )
  }

  getGeneros (): Observable<Genero[]> {
    this.montaHeaderToken();
    console.log(httpOptions.headers);
    return this.http.get<Genero[]>(apiUrl, httpOptions)
      .pipe(
        tap(Generos => console.log('leu as Generos')),
        catchError(this.handleError('getGeneros', []))
      );
  }

  getGenero(id: number): Observable<Genero> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`leu a Genero id=${id}`)),
      catchError(this.handleError<Genero>(`getGenero id=${id}`))
    );
  }

  addGenero (Genero: any): Observable<Genero> {
    this.montaHeaderToken();
    return this.http.post<Genero>(apiUrl, Genero, httpOptions).pipe(
      tap((Genero: Genero) => console.log(`adicionou a Genero com w/ id=${Genero.generoId}`)),
      catchError(this.handleError<Genero>('addGenero'))
    );
  }

  updateGenero(id: any, Genero: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Genero, httpOptions).pipe(
      tap(_ => console.log(`atualiza o produco com id=${id}`)),
      catchError(this.handleError<any>('updateGenero'))
    );
  }

  deleteGenero (id: any): Observable<Genero> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Genero>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o Genero com id=${id}`)),
      catchError(this.handleError<Genero>('deleteGenero'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
