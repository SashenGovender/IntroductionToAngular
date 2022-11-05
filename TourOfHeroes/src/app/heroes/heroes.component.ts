import { Hero } from './../models/hero';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero  = new Hero(1, "Windstorm")

  constructor() { }

  ngOnInit(): void {
  }

}
