import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecoverAttempt } from '../auth-data.model';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

    private recoverForm: FormGroup;
    private recovering = false;

    constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) {}

    ngOnInit() {
        this.recoverForm = new FormGroup({
          email: new FormControl(
              null,
              {
                  validators: [ Validators.required, Validators.email ],
                  asyncValidators: [ this.validateAccountInUse(this.authService) ]
              }
          )
        });
    }

    onSubmit() {
        this.recovering = true;

        this.authService.resetPassword(this.recoverForm.controls['email'].value)
            .then(result => {
                this.recovering = false;
                this.displayResult(result);

                if (result === RecoverAttempt.Ok) {
                    this.router.navigate(['/authentication/login']);
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
                    return (inUse) ? null : { inexistentAccount: true };
                })
            );
        };
    }

    displayResult(result: RecoverAttempt): void {
        if (result === RecoverAttempt.Ok) {
            this.toastService.success(result, 'Contraseña restablecida correctamente');
        } else {
            this.toastService.error(result, 'Error al resetear la contraseña');
        }
    }
}
