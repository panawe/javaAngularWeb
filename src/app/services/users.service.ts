import { Injectable } from '@angular/core';
import { Constants } from '../app.constants';
import { Http, Response, Headers } from '@angular/http';
import { User } from '../models/User';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public register = (user: User): Observable<User> => {
    const toAdd = JSON.stringify(user);
    const actionUrl = Constants.apiServer + '/service/user/register';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
    .map((response: Response) => {
      if (response && response.json()) {
        return  <User>response.json();
      }
    })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
