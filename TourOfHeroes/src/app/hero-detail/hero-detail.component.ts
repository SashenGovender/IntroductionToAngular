import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(
    private route: ActivatedRoute, // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
    private heroService: HeroService, // The HeroService gets hero data from the remote server 
    private location: Location) { } // The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.

  ngOnInit(): void {
    this.getHero();
  }

  public goBack(): void {
    this.location.back();
  }

  public save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }

  private getHero(): void {
    // The route.snapshot is a static image of the route information shortly after the component was created.
    // The paramMap is a dictionary of route parameter values extracted from the URL. Route parameters are always strings.
    const id = Number(this.route.snapshot.paramMap.get('id')); // The JavaScript Number function converts the string to a number,
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
}
