import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // so the application can have routing capability.

import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';

// Routes tell the Router which view to display when a user clicks a link or pastes a URL into the browser address bar.
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //This route redirects a URL that fully matches the empty path to the route whose path is '/dashboard'.
  { path: "dashboard", component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, // The colon : character in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'heroes', component: HeroesComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // exports RouterModule to be available throughout the application.
})
export class AppRoutingModule { }
