/**Core module */
import { NgModule } from '@angular/core';

/**
 * Web Module
 */
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
/**needed for primeNG */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ReviewComponent } from './components/reservations/review.component';

/**
 * PrimeNG module
 */
import { TableModule } from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {PaginatorModule} from 'primeng/paginator';
import {SpinnerModule} from 'primeng/spinner';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import {EditorModule} from 'primeng/editor';
import {RatingModule} from 'primeng/rating';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ReservationsComponent,
    Page404Component,
    HomeComponent,
    ClientsComponent,
    LoginComponent,
    InscriptionComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,BrowserAnimationsModule,
    TableModule,PanelModule,PaginatorModule,SpinnerModule,ButtonModule,SliderModule,CalendarModule,EditorModule,RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
