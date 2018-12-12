import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  reservations: Reservation[];
  constructor(private reservationService: ReservationsService) { }

  ngOnInit() {
    this.reservationService.getReservationsWithFeedback().subscribe(result => {
      this.reservations = result;
    });
  }

}
