import { NavigationComponent } from './navigation/header-navigation/navigation.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { BreadcrumbComponent } from './navigation/breadcrumb/breadcrumb.component';
import { SpinnerComponent } from './spinner.component';
import { FullComponent } from '../layouts/full/full.component';
import { JumbotronComponent } from '../layouts/full/jumbotron/jumbotron.component';
import { BlankComponent } from '../layouts/blank/blank.component';
import { TagComponent } from './ui-components/tag/tag.component';
import { ScrollPointDirective } from './ui-directives/scroll-point.directive';

import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';
import { NewTagComponent } from './ui-components/new-tag/new-tag.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    PerfectScrollbarModule,
    RouterModule,
  ],
  declarations: [
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    FullComponent,
    JumbotronComponent,
    BlankComponent,
    SpinnerComponent,
    TagComponent,
    NewTagComponent,
    ScrollPointDirective
  ],
  exports: [
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent,
    FullComponent,
    JumbotronComponent,
    BlankComponent,
    SpinnerComponent,
    TagComponent,
    NewTagComponent,
    ScrollPointDirective
  ]
})
export class SharedModule {}
