import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Hero } from '../models/hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Array<Hero>> //The $ is a convention that indicates heroes$ is an Observable, not an array.

  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  // You can also push values into that Observable by calling its next(value) method as the search() method does.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms
      .pipe(
        // waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string
        debounceTime(300),
        // ignore new term if same as previous term.  ensures that a request is sent only if the filter text changed.
        distinctUntilChanged(),
        // calls the search service for each search term that makes it through debounce() and distinctUntilChanged()
        switchMap((term: string) => this.heroService.searchHeroes(term)),
      )
  }

  // Push a search term into the observable stream.
  public search(term: string): void {
    // Every time the user types in the text box, the binding calls search() with the text box value as a search term.
    // The searchTerms becomes an Observable emitting a steady stream of search terms.
    this.searchTerms.next(term);
  }

}
