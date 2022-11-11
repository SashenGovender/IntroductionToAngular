import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HEROES } from '../data/mock-heroes';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';

// A provider is something that can create or deliver a service. In this case, it instantiates the HeroService class to provide the service.
// The injector is the object that chooses and injects the provider where the application requires it.
// When you provide the service at the root level, Angular creates a single, shared instance of HeroService and injects into any class that asks for it.
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl: string = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageService: MessageService, private httpClient: HttpClient) { }

  // An observable from HttpClient always emits a single value and then completes, never to emit again.
  public getHeroes(): Observable<Array<Hero>> {
    //const heroes = of(HEROES); //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.

    const heroes = this.httpClient.get<Array<Hero>>(this.heroesUrl)
      //Used to stitch together functional operators into a chain. Before we could just do observable.filter().map().scan(). we need pipe() to make a chain of those operators
      .pipe(
        //Can perform side effects with observed data but does not modify the stream in any way.
        tap(_ => this.log('fetched heroes')),

        // To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
        // The catchError() operator intercepts an Observable that failed. The operator then passes the error to the error handling function.
        catchError(this.handleError<Hero[]>('getHeroes', [])));
    return heroes;
  }

  public getHero(id: number): Observable<Hero> {
    const hero = this.httpClient.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`fetched hero with id=${id}`)),
        catchError(this.handleError<Hero>('getHero'))
      );
    return hero;
  }

  public updateHero(hero: Hero): Observable<any> {
    const response = this.httpClient.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero with id=${hero.id}`)),
        catchError(this.handleError('updateHero'))
      );
    return response;
  }

  public addHero(hero: Hero): Observable<Hero> {
    const response = this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`added new hero with id=${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
    return response;
  }

  public deleteHero(heroId: number): Observable<any> {
    const response = this.httpClient.delete(`${this.heroesUrl}/${heroId}`, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero with id=${heroId}`)),
        catchError(this.handleError('deleteHero'))
      );
    return response;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
