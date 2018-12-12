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
  selectedReservation: Reservation;
  unitCost: number = 1000;
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
      { field: 'userFirstName', header: 'Prenom' },
      { field: 'userLastName', header: 'Nom' },
      { field: 'userPhone', header: 'Phone' },
      { field: 'reservationDate', header: 'Date', type: 'date' },
      { field: 'nbrRooms', header: 'Nb. Chambres' },
      { field: 'cost', header: 'Cout' }
    ];

    if (this.user != null) {
      if (this.user.role === 1) {
        this.getAllReservations();
      } else {
        this.getUserReservations();
      }
    }
    if (this.reservations == null || this.reservations.length < 1) {
      this.makeUpData();
    }
    this.getUnitCost();
  }

  getUnitCost() {
    this.reservationService.getUnitCost()
      .subscribe(result => {
        this.unitCost = result == null || result <= 0 ? 1000 : result;
      });
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

  reserver() {

    console.log('Button clicked = ' || this.button);
    if (this.button === 1) {
      this.selectedReservation.cost= this.unitCost*this.selectedReservation.nbrRooms;

      this.reservationService.reserver(this.selectedReservation)
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
    } else if (this.button === 2) {
      this.reservationService.delete(this.selectedReservation)
        .subscribe(result => {
          if (result.startsWith('Success')) {
            this.selectedReservation = new Reservation();
            this.selectedReservation.nbrRooms = 1;
            this.selectedReservation.user = this.user;
          } else {
            // do nothing. Just display the error
            this.error = result;
          }
        });
    } else if (this.button === 3) {
      this.selectedReservation.status = 1;
      this.reservationService.confirmer(this.selectedReservation)
        .subscribe(result => {
          if (result.startsWith('Success')) {
            this.selectedReservation = new Reservation();
            this.selectedReservation.nbrRooms = 1;
            this.selectedReservation.user = this.user;
          } else {
            // do nothing. Just display the error
            this.error = result;
          }
        });
    } else if (this.button === 4) {
      this.selectedReservation.status = 2;
      this.reservationService.terminer(this.selectedReservation)
        .subscribe(result => {
          if (result.startsWith('Success')) {
            this.selectedReservation = new Reservation();
            this.selectedReservation.nbrRooms = 1;
            this.selectedReservation.user = this.user;
          } else {
            // do nothing. Just display the error
            this.error = result;
          }
        });
    }

  }

  updatePriceColor() {
    if (this.selectedReservation.nbrRooms < 10) {
      this.costClass = 'ui-button-success';
    } else if (this.selectedReservation.nbrRooms < 30) {
      this.costClass = 'ui-button-info';
    } else if (this.selectedReservation.nbrRooms < 50) {
      this.costClass = 'ui-button-secondary';
    } else if (this.selectedReservation.nbrRooms < 70) {
      this.costClass = 'ui-button-warning';
    } else {
      this.costClass = 'ui-button-danger';
    }
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
