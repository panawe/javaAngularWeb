import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./users.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    console.log('Registring this user: ' + this.user.toString());
    this.userService.login(this.user)
      .subscribe(result => {
        this.user = result;
        if (this.user.error.startsWith('Success')) {
          Cookie.set('user', JSON.stringify(this.user));
          this.router.navigate(['/']);
          window.location.reload();
        } else {
          //do nothing. Just display the error message.
        }
      });
  }
}
