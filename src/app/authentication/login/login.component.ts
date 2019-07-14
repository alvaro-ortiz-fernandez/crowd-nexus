import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginform = true;
  recoverform = false;

  onSubmit(form: NgForm) {
      this.authService.login({
          email: form.value.email,
          password: form.value.password
      });
  }

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
}
