import { RouterModule, Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './authentication/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'topics', loadChildren: './forum/forum.module#ForumModule' }
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'authentication', loadChildren: './authentication/authentication.module#AuthenticationModule' }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes /*, {useHash: true}*/)
  ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class AppRoutingModule {

}
