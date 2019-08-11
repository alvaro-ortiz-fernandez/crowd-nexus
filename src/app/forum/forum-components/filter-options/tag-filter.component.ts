import { Component, OnDestroy, OnInit } from '@angular/core';
import { ForumService } from '../forum.service';
import { Subscription } from 'rxjs';
import { Tag } from '../../../shared/ui-components/tag/tag.model';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css']
})
export class TagFilterComponent implements OnInit, OnDestroy {

    filterOptionSubscription: Subscription;
    removeTagCallback: Function;
    tags: Tag[];

    constructor(private forumService: ForumService) {}

    ngOnInit() {
        this.removeTagCallback = this.removeTag.bind(this);

        this.tags = this.forumService.topicFilterOptions.tags;

        this.filterOptionSubscription = this.forumService.filterOptionsEmitter
            .subscribe(() => {
                this.tags = this.forumService.topicFilterOptions.tags;
            });
    }

    ngOnDestroy() {
        this.filterOptionSubscription.unsubscribe();
    }

    removeTag(tag: Tag) {
        let removed = false;
        // Eliminamos la etiqueta (sólo debería haber una con el mismo nombre y tipo)
        this.forumService.topicFilterOptions.tags
            .forEach((t, index) => {
                if (t.name === tag.name && t.bgColor === tag.bgColor && t.textColor === tag.textColor) {
                    this.forumService.topicFilterOptions.tags.splice(index, 1);
                    removed = true;
                }
            });

        if (removed) {
            this.forumService.filterOptionsEmitter.emit();
        }
    }
}
