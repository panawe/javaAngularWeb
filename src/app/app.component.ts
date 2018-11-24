import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from './models/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user: User;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    if (this.user == null) {
      this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        this.user = new User();
        this.user.id = 0;
        this.user.firstName = '';
        this.user.lastName = '';
      }
    }
  }

  /**
   * Enlever l'utilisateur du cookie
   * Naviguer au home page
   * Refresh la page.
   */
  public logout() {
    Cookie.deleteAll();
    this.user = new User();
    this.router.navigate(['/']);
    window.location.reload();
  }

}
