import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { ChartistModule } from 'ng-chartist';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule } from 'angular-calendar';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { CommentComponent } from './dashboard-components/recent-comments/comment.component';
import { ChatComponent } from './dashboard-components/global-chat/chat.component';

import {
  CategoriesComponent,
  MixstatsComponent,
  RpbComponent,
  WeekpollComponent
} from './dashboard-components';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    PerfectScrollbarModule,
    CalendarModule.forRoot(),
    NgxChartsModule,
    NgxDatatableModule
  ],
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    MixstatsComponent,
    RpbComponent,
    WeekpollComponent,
    CommentComponent,
    ChatComponent
  ]
})
export class DashboardModule {}
