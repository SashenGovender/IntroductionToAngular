import { Hero } from './../models/hero';
import { Component, OnInit } from '@angular/core';
import { HeroService } from '../services/hero.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Array<Hero> = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {
    // Reserve the constructor for minimal initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. 
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

  public addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  public deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id)
      .subscribe();
  }

}
