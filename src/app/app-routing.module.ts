import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './components/page404/page404.component';
import { HomeComponent } from './components/home/home.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ClientsComponent } from './components/users/clients.component';
import { LoginComponent } from './components/users/login.component';
import { InscriptionComponent } from './components/users/inscription.component';
import { ReviewComponent } from './components/reservations/review.component';

const routes: Routes = [
{ path: '', component: HomeComponent, pathMatch: 'full' }, // redirect to home page
{ path: 'reservations', component: ReservationsComponent},
{ path: 'clients', component: ClientsComponent},
{ path: 'login', component: LoginComponent},
{ path: 'inscription', component: InscriptionComponent},
{ path: 'review', component: ReviewComponent},
{ path: '**', component: Page404Component} // Invalid route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
