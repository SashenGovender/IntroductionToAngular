import { Hero } from './../models/hero';
import { Component, OnInit } from '@angular/core';
import { HEROES } from './../data/mock-heroes'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Array<Hero> = HEROES;
  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  public onSelectHero(hero: Hero){
    this.selectedHero = hero;
  }

}
