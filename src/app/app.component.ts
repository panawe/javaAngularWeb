import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from './models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User = new User();
  constructor(private router: Router) {

  }

  public logout() {
    Cookie.deleteAll();
    this.user = new User();
    this.router.navigate(['/']);
    window.location.reload();
  }

}
