import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/Reservation';
import { User } from '../../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReviewComponent implements OnInit {
  cols: any[];
  user: User;
  reservations: Reservation[];
  selectedReservation: Reservation;
  unitCost: Number = 1000;
  button: Number = 0;
  error: String = '';
  reportName: String;
  printLabel: String = 'Imprimer';
  costClass = 'ui-button-success';
  constructor(private reservationService: ReservationsService) { }

  ngOnInit() {
    this.user = JSON.parse(Cookie.get('user'));
    this.selectedReservation = new Reservation();
    this.selectedReservation.nbrRooms = 1;
    this.selectedReservation.user = this.user;
    this.cols = [
      { field: 'id', header: 'Numero' },
      { field: 'user.firstName', header: 'Prenom' },
      { field: 'user.lastName', header: 'Nom' },
      { field: 'user.phone', header: 'Phone' },
      { field: 'reservationDate', header: 'Date', type: 'date' },
      { field: 'nbrRooms', header: 'Nb. Chambres' },
      { field: 'cost', header: 'Cout' }
    ];

    if (this.user != null) {
      if (this.user.role === 1) {
        // this.getAllReservations();
      } else {
        this.getUserReservations();
      }
    }
    if(this.reservations==null||this.reservations.length<1) {
      this.makeUpData();
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

  review() {

      this.reservationService.review(this.selectedReservation)
        .subscribe(result => {
          this.selectedReservation = result;
          if (this.selectedReservation.error.startsWith('Success')) {
            this.selectedReservation = new Reservation();
            this.selectedReservation.nbrRooms = 1;
            this.selectedReservation.user = this.user;
          } else {
            // do nothing. Just display the error
            this.error = this.selectedReservation.error;
          }
        });

  }
 
  makeUpData() {
    const user1: User = new User();
    user1.firstName = 'Panawe';
    user1.lastName = 'Bat';
    user1.phone = '68919219319';
    const res1: Reservation = new Reservation();
    res1.nbrRooms = 5;
    res1.reservationDate = new Date();
    res1.cost = 5000;
    res1.comment = 'Test comment';
    res1.user = user1;

    const res2: Reservation = new Reservation();
    res2.nbrRooms = 5;
    res2.reservationDate = new Date();
    res2.cost = 50;
    res2.comment = 'Test comment2';
    res2.user = user1;

    this.reservations = [res1, res2];

  }
  /**
   * Generate report path
   */
  printReservations() {
    this.reportName = null;
    this.printLabel = 'Impression en cours ...';
    this.reservationService.printReservations(this.user)
      .subscribe(result => {
        this.reportName = result;
        this.printLabel = 'Imprimer';
      });
    this.printLabel = 'Imprimer';
  }

}
