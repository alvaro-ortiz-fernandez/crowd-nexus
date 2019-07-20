import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './404/not-found.component';
import { AuthGuard } from './auth.guard';
import { RecoverComponent } from './recover/recover.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'recover',
        component: RecoverComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      },
    ]
  }
];
