import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./users.component.css']
})
export class InscriptionComponent implements OnInit {
  user: User = new User();
  error: string;
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
  }
  /**
   * Cette methode est appelee pour enregistrer un utilisateur
   */
  register() {
    console.log('Registring this user: ' + this.user.toString());
    this.userService.register(this.user)
      .subscribe(result => {
        this.user = result;
        if (this.user.error == null || this.user.error === '') {
          this.router.navigate(['/']);
          window.location.reload();
        } else {
          this.error = 'Echec...';
        }
      });
  }
}
