import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  /* Abrimos este listener desde AppComponent, para
  mantener el estado de la sesión de usuario */
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(this.isAuthenticated);
        this.router.navigate(['/']); // TODO: Redirigir a la página de la que venía
      } else {
        this.authChange.next(this.isAuthenticated);
        this.router.navigate(['/']); // TODO: Redirigir a la página de la que venía
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => { })
        .catch(error => {
          console.error(error);
        });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
