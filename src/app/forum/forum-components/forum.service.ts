import { EventEmitter, Injectable, Output } from '@angular/core';
import { TopicSummary, TopicFilterOptions } from './topic-list/topic/topic-data.model';
import { SortOption } from './topic-sorter/sort-option.model';
import { TagColor } from '../../shared/ui-components/tag/tag.model';

@Injectable()
export class ForumService {

    @Output() filterOptionsEmitter = new EventEmitter<void>();

    topicFilterOptions: TopicFilterOptions = {
        title: '',
        sortTerm: SortOption.Date,
        tags: []
    };

    topics: TopicSummary[] = [
      {
        title: 'Some topic title',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'Another title',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'Testing something',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'Here we go again',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'I dont know what to write',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'Images and foods',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          },
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      },
      {
        title: 'Horses and dogs',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Info,
            textColor: TagColor.Info
          }
        ]
      },
      {
        title: 'Seriously i dont know more',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Success,
            textColor: TagColor.Success
          }
        ]
      },
      {
        title: 'Films and books',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Warning,
            textColor: TagColor.Warning
          }
        ]
      },
      {
        title: 'End of imagination',
        author: 'Some User',
        date: 'Thu Nov 2019 19:23',
        posts: 16,
        views: 374,
        lastPostAuthor: 'Some User',
        lastPostDate: 'Thu Nov 2019 19:23',
        tags: [
          {
            name: 'Test tag',
            bgColor: TagColor.Danger,
            textColor: TagColor.Danger
          }
        ]
      }
    ];

    constructor() {}
}
