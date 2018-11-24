import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Rx';
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getUserReservations = (user: User): Observable<Reservation[]> => {
    const actionUrl = Constants.apiServer + '/service/reservation/getUserReservations/' + user.id;
    return this.http.get(actionUrl)
      .map((response: Response) => <Reservation[]>response.json())
      .catch(this.handleError);
  }
  public getAllReservations = (): Observable<Reservation[]> => {
    const actionUrl = Constants.apiServer + '/service/reservation/getAllReservations';
    return this.http.get(actionUrl)
      .map((response: Response) => <Reservation[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
