import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthenticationRoutes } from './authentication.routing';
import { NotfoundComponent } from './404/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecoverComponent } from './recover/recover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    RecoverComponent
  ]
})
export class AuthenticationModule {}
