import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AuthData,
  getLoginStatusCode,
  getRecoverStatusCode,
  getRegistrationStatusCode,
  LoginAttempt, RecoverAttempt,
  RegisterAttempt
} from './auth-data.model';

@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    isAuthenticated = false;

    constructor(private afAuth: AngularFireAuth) {}

    /* Abrimos este listener desde AppComponent, para
    mantener el estado de la sesión de usuario */
    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
            } else {
                this.isAuthenticated = false;
            }
            this.authChange.next(this.isAuthenticated);
        });
    }

    login(authData: AuthData): Promise<LoginAttempt> {
        return this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                return LoginAttempt.Ok;
            })
            .catch(error => {
                return getLoginStatusCode(error.code);
            });
    }

    registerUser(authData: AuthData): Promise<RegisterAttempt> {
        return this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
                .then(result => {
                    return RegisterAttempt.Ok;
                })
                .catch(error => {
                    return getRegistrationStatusCode(error.code);
                });
    }

    resetPassword(email: string): Promise<RecoverAttempt> {
        return this.afAuth.auth.sendPasswordResetEmail(email)
            .then(() => {
                return RecoverAttempt.Ok;
            })
            .catch(error => {
                return getRecoverStatusCode(error.code);
            });
    }

    checkAccountInUse(email: string): Promise<boolean> {
        return this.afAuth.auth.fetchSignInMethodsForEmail(email)
            .then((result: Array<string>) => {
                // Si firebase algún valor es porque existe la cuenta
                return result.length > 0;
            })
            .catch(error => {
                return false;
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}
