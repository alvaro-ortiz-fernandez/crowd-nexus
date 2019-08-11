import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData, LoginAttempt } from '../auth-data.model';
import { ToastrService } from 'ngx-toastr';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    private loginForm: FormGroup;
    private navigationSubscription: Subscription;
    private previousUrl: string;
    private logging = false;

    constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) {}

    ngOnInit() {
        // Con esto guardamos la última URL, para redirigir el navegador a ella cuando el usuario se logee
        this.navigationSubscription = this.router.events
            .pipe(filter((e: any) => e instanceof RoutesRecognized), pairwise())
            .subscribe((e: any) => {
                this.previousUrl = e[0].urlAfterRedirects;
            });

        this.loginForm = new FormGroup({
            email: new FormControl(null, [ Validators.required, Validators.email ]),
            password: new FormControl(null, [ Validators.required ])
        });
    }

    ngOnDestroy() {
        this.navigationSubscription.unsubscribe();
    }

    onSubmit() {
        this.logging = true;

        const authData: AuthData = {
            email: this.loginForm.controls.email.value,
            password: this.loginForm.controls.password.value
        };

        this.authService.login(authData)
            .then(result => {
                this.logging = false;
                this.displayResult(result);

                if (result === LoginAttempt.Ok) {
                    const redirectUrl = (this.previousUrl) ? this.previousUrl : '/';
                    this.router.navigate([redirectUrl]);
                }
            });
    }

    displayResult(result: LoginAttempt): void {
        if (result === LoginAttempt.Ok) {
            this.toastService.success(result, 'Operación completada con éxito');
        } else {
            this.toastService.error(result, 'Error al iniciar sesión');
        }
    }
}
