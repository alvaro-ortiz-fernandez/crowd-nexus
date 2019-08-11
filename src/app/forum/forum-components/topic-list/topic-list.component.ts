import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopicSummary } from './topic/topic-data.model';
import { ForumService } from '../forum.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { SortOption } from '../topic-sorter/sort-option.model';
import { Tag } from '../../../shared/ui-components/tag/tag.model';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css'],
  animations: [
    trigger('TopicListAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-in')
      ]),

      transition(':leave', [
        animate('0.4s ease-out',
          style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class TopicListComponent implements OnInit, OnDestroy {

    filterOptionSubscription: Subscription;
    filteredTopics: TopicSummary[];

    constructor(private forumService: ForumService) {}

    ngOnInit() {
        // Filtramos los topics del servicio al iniciar el componente
        this.filterTopics();

        // Filtramos los topics cuando se actualice el filtro
        this.filterOptionSubscription = this.forumService.filterOptionsEmitter
            .subscribe(() => {
                this.filterTopics();
            });
    }

    ngOnDestroy() {
        this.filterOptionSubscription.unsubscribe();
    }

    applyTag(tag: Tag) {
        // Comprobamos si ya se está filtrando la etiqueta
        const filteredTag: Tag | undefined = this.forumService.topicFilterOptions.tags.find(t => {
            return t.name === tag.name && t.bgColor === tag.bgColor && t.textColor === tag.textColor;
        });

        // La aplicamos si no se está filtrando
        if (!filteredTag) {
            // Actualizamos el filtro y lo notificamos
            this.forumService.topicFilterOptions.tags.push(tag);
            this.forumService.filterOptionsEmitter.emit();
        }
    }

    updateFilter(event: Event) {
        // Actualizamos el filtro y lo notificamos
        this.forumService.topicFilterOptions.title = (<HTMLInputElement>event.target).value.toLowerCase();
        this.forumService.filterOptionsEmitter.emit();
    }

    filterTopics() {
        const title = this.forumService.topicFilterOptions.title;

        this.filteredTopics = this.forumService.topics.filter((topic) => {
            let tagMatches = false;
            // Primero filtramos por título
            const titleMatches: boolean = !title || topic.title.toLowerCase().indexOf(title) !== -1;

            // Si pasa el filtro de título, filtramos por etiquetas (si hay etiquetas)
            if (titleMatches && this.forumService.topicFilterOptions.tags.length > 0) {
                // Comprobamos si este topic posee una de las etiquetas del filtro
                const topicTag = topic.tags.find((tag: Tag) => {
                    // Comprobamos si esta etiqueta del topic es alguna de las filtradas
                    const filterTag: Tag = this.forumService.topicFilterOptions.tags
                        .find((ft: Tag) => {
                            return ft.name === tag.name && ft.bgColor === tag.bgColor && ft.textColor === tag.textColor;
                        });

                    return filterTag !== undefined;
                });

                if (topicTag !== undefined) {
                    tagMatches = true;
                }
            } else {
                tagMatches = true;
            }

            return titleMatches && tagMatches;
        })
        // Los ordenamos
        .sort((topic1, topic2) => {
            switch (this.forumService.topicFilterOptions.sortTerm) {
              case SortOption.Views:
                  return topic1.views > topic2.views ? 1 : -1;
              case SortOption.Title:
                  return topic1.title > topic2.title ? 1 : -1;
              case SortOption.Date:
              default:
                  return topic1.date > topic2.date ? 1 : -1;
            }
        });
    }
}
