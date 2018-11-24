import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/Reservation';
import { User } from '../../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  cols: any[];
  user: User;
  reservations: Reservation[];
  selectedReservation:Reservation;
  constructor(private reservationService: ReservationsService) { }

  ngOnInit() {

    this.cols = [
      { field: 'user.firstName', header: 'Prenom' },
      { field: 'user.lastName', header: 'Nom' },
      { field: 'user.phone', header: 'Phone' },
      { field: 'reservationDate', header: 'E-mail' },
      { field: 'nbrRooms', header: 'Nb. Chambres' },
      { field: 'cost', header: 'Cout' }
    ];

    this.user = JSON.parse(Cookie.get('user'));
    if (this.user != null) {
      if (this.user.role === 1) {
        this.getAllReservations();
      } else {
        this.getUserReservations();
      }
    }
  }

  getAllReservations() {
    this.reservationService.getAllReservations()
      .subscribe(result => {
        this.reservations = result;
      });
  }
  getUserReservations() {
    this.reservationService.getUserReservations(this.user)
      .subscribe(result => {
        this.reservations = result;
      });
  }

}
