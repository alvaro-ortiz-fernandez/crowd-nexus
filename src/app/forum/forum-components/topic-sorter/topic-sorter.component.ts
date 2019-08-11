import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForumService} from '../forum.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {SortOption} from './sort-option.model';

@Component({
  selector: 'app-topic-sorter',
  templateUrl: './topic-sorter.component.html',
  styleUrls: ['./topic-sorter.component.css']
})
export class TopicSorterComponent implements OnInit, OnDestroy {

    topicSortForm: FormGroup;
    formSubscription: Subscription;

    constructor(private forumService: ForumService) {}

    ngOnInit() {
        this.topicSortForm = new FormGroup({
            sortTerm: new FormControl(null, [])
        });

        this.formSubscription = this.topicSortForm.valueChanges
            .subscribe((form: { sortTerm: string }) => {
                let sortTerm: SortOption;

                switch (form.sortTerm) {
                    case 'radioViews': sortTerm = SortOption.Views; break;
                    case 'radioName':  sortTerm = SortOption.Title; break;
                    case 'radioDate':
                    default:           sortTerm = SortOption.Date; break;
                }

                // Actualizamos el filtro y lo notificamos
                this.forumService.topicFilterOptions.sortTerm = sortTerm;
                this.forumService.filterOptionsEmitter.emit();
            });
    }

    ngOnDestroy() {
        this.formSubscription.unsubscribe();
    }
}
