import {Component, OnInit} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData, RegisterAttempt } from '../auth-data.model';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private signupForm: FormGroup;
    private registering = false;

    constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) {}

    ngOnInit() {
        this.signupForm = new FormGroup({
            email: new FormControl(
                null,
                {
                    validators: [ Validators.required, Validators.email ],
                    asyncValidators: [ this.validateAccountInUse(this.authService) ]
                }
            ),
            passwords: new FormGroup({
                password: new FormControl(null, [ Validators.required ]),
                confirmPassword: new FormControl(null, [ Validators.required ])
            }, this.validateConfirmPassword)
        });
    }

    onSubmit() {
        this.registering = true;

        const authData: AuthData = {
            email: this.signupForm.get('email').value,
            password: this.signupForm.get('passwords.password').value
        };

        this.authService.registerUser(authData)
            .then(result => {
                this.registering = false;
                this.displayResult(result);

                if (result === RegisterAttempt.Ok) {
                    this.router.navigate(['/']);
                }
            });
    }

    validateAccountInUse(authService: AuthService, time: number = 800) {
        return (emailControl: FormControl) => {
            // timer() se encarga de no activar la validación más de una vez cada X tiempo
            // Muy conveniente para no validar cada vez que se teclee un caracter en el input
            return timer(time).pipe(
                // switchMap() cancela operaciones pendientes si aparece una nueva
                switchMap(() => {
                    return this.authService.checkAccountInUse(emailControl.value);
                }),
                map(inUse => {
                    return (!inUse) ? null : { loginExist: true };
                })
            );
        };
    }

    validateConfirmPassword(passwordsGroup: FormGroup): null {
        const passwordControl: AbstractControl = passwordsGroup.controls['password'];
        const confirmControl: AbstractControl = passwordsGroup.controls['confirmPassword'];

        if (confirmControl.dirty) {
            if (passwordControl.value !== confirmControl.value) {
                confirmControl.setErrors({ matches: true });
            } else {
                confirmControl.setErrors(null);
            }
        }
        return null;
    }

    displayResult(result: RegisterAttempt): void {
        if (result === RegisterAttempt.Ok) {
            this.toastService.success(result, 'Operación completada con éxito');
        } else {
            this.toastService.error(result, 'Error al crear la cuenta');
        }
    }

}
