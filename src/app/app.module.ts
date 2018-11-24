/**Core module */
import { NgModule } from '@angular/core';

/**
 * Web Module
 */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

/**
 * Routing
 */
import { AppRoutingModule } from './app-routing.module';

/**
 * Custom Modules
 */
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/users/clients.component';
import { LoginComponent } from './components/users/login.component';
import { InscriptionComponent } from './components/users/inscription.component';

/**
 * PrimeNG module
 */
import { TableModule } from 'primeng/table'; 

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ReservationsComponent,
    Page404Component,
    HomeComponent,
    ClientsComponent,
    LoginComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    TableModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
