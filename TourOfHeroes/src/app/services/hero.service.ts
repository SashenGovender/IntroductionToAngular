import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor(private messageService: MessageService) { }

  public getHeroes(): Observable<Array<Hero>> {
    const heroes = of(HEROES); //of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  public getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
