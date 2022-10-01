import { DialogComponent } from './dialog/dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  //declarations are to make components,directive pipes from the current module available to other components,directive pipes in the current module.
  declarations: [
    AppComponent,
    NavbarComponent,
    DialogComponent,
    HomeComponent
  ],
  //imports makes the exported declarations of other modules available in the current module
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //providers are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
