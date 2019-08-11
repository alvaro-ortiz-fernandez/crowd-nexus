import { Routes } from '@angular/router';
import { ForumComponent } from './forum-components/forum.component';
import { NewTopicComponent } from './forum-components/new-topic/new-topic.component';

export const ForumRoutes: Routes = [
  {
    path: '',
    component: ForumComponent,
    data: { title: 'Topic List' }
  },
  {
    path: 'new',
    component: NewTopicComponent,
    data: { title: 'New Topic' }
  }
];
