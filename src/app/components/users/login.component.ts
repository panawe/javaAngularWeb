import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./users.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor() { }

  ngOnInit() {
  }

}
