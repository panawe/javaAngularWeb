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

  public getReservationsWithFeedback = (): Observable<Reservation[]> => {
    const actionUrl = Constants.apiServer + '/service/reservation/getReservationsWithFeedback';
    return this.http.get(actionUrl)
      .map((response: Response) => <Reservation[]>response.json())
      .catch(this.handleError);
  }
  public reserver = (reservation: Reservation): Observable<Reservation> => {
    const toAdd = JSON.stringify(reservation);
    const actionUrl = Constants.apiServer + '/service/reservation/reserver';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return <Reservation>response.json();
        }
      })
      .catch(this.handleError);
  }

  public review = (reservation: Reservation): Observable<Reservation> => {
    const toAdd = JSON.stringify(reservation);
    const actionUrl = Constants.apiServer + '/service/reservation/review';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return <Reservation>response.json();
        }
      })
      .catch(this.handleError);
  }

  public delete = (reservation: Reservation): Observable<String> => {
    const actionUrl = Constants.apiServer + '/service/reservation/delete/' + reservation.id;
    return this.http.get(actionUrl)
      .map((response: Response) => <String>response.json())
      .catch(this.handleError);
  }

  public confirmer = (reservation: Reservation): Observable<String> => {
    const toAdd = JSON.stringify(reservation);
    const actionUrl = Constants.apiServer + '/service/reservation/confirmer';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return <String>response.json();
        }
      })
      .catch(this.handleError);
  }

  public terminer = (reservation: Reservation): Observable<String> => {
    const actionUrl = Constants.apiServer + '/service/reservation/terminer/' + reservation.id;
    return this.http.get(actionUrl)
      .map((response: Response) => <String>response.json())
      .catch(this.handleError);
  }

  public getUnitCost = (): Observable<number> => {
    const actionUrl = Constants.apiServer + '/service/reservation/getUnitCost';
    return this.http.get(actionUrl)
      .map((response: Response) => <number>response.json())
      .catch(this.handleError);
  }


  public printReservations = (user: User): Observable<String> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + '/service/reservation/printReservations';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json()) {
          return <String>response.json();
        }
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
