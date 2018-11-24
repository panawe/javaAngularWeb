import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./users.component.css']
})
export class InscriptionComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
  }
    
  /**
   * Cette methode est appelee pour enregistrer un utilisateur
   * Si l'enregistrement passe alors l'utilisateur est redirige sur la page d'accueil
   * Sinon, l'erreur retournee par le serveur est affichee
   */
  register() {
    console.log('Registring this user: ' + this.user.toString());
    this.userService.register(this.user)
      .subscribe(result => {
        this.user = result;
        if (this.user.error.startsWith('Success')) {
          Cookie.set('user', JSON.stringify(this.user));
          this.router.navigate(['/']);
          window.location.reload();
        } else {
          //do nothing. Just display the error 
        }
      });
  }
}
