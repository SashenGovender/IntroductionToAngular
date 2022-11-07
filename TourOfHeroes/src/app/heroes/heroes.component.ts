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
  selectedHero?: Hero;

  constructor(private heroService: HeroService, private messageService: MessageService) {
   // Reserve the constructor for minimal initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. 
   }

  ngOnInit(): void {
    this.getHeroes();
  }

  public onSelectHero(hero: Hero){
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  public getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes); // The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
  }

}
