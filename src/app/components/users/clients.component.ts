import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./users.component.css']
})
export class ClientsComponent implements OnInit {
  cols: any[];
  user: User;
  users: User[];
  selectedUser: User;
  constructor(private userService: UsersService, private router: Router) { }


  ngOnInit() {
    this.user = JSON.parse(Cookie.get('user'));
    this.selectedUser = new User();
    this.cols = [
      { field: 'user.firstName', header: 'Prenom' },
      { field: 'user.lastName', header: 'Nom' },
      { field: 'user.phone', header: 'Phone' },
      { field: 'email', header: 'E-mail' },
      { field: 'address', header: 'Address' }
    ];

    if (this.user != null) {
      if (this.user.role === 1) {
        // this.getAllReservations();
      } else {
        this.getAllClients();
      }
    }
  }

  getAllClients() {
    this.userService.getAllClients()
      .subscribe(result => {
        this.users = result;
      });
  }
}
