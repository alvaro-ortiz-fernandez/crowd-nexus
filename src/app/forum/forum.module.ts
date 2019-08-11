import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForumRoutes } from './forum.routing';
import { SharedModule } from '../shared/shared.module';

import { ForumComponent } from './forum-components/forum.component';
import { TopicListComponent } from './forum-components/topic-list/topic-list.component';
import { TagFilterComponent } from './forum-components/filter-options/tag-filter.component';
import { TopicSorterComponent } from './forum-components/topic-sorter/topic-sorter.component';
import { ForumService } from './forum-components/forum.service';
import { NewTopicComponent } from './forum-components/new-topic/new-topic.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ForumRoutes),
    NgbModule,
    QuillModule
  ],
  declarations: [
    ForumComponent,
    TopicListComponent,
    TagFilterComponent,
    TopicSorterComponent,
    NewTopicComponent
  ],
  providers: [
    ForumService
  ]
})
export class ForumModule {}
