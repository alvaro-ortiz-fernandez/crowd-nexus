import { Component, OnInit, ViewChild } from '@angular/core';
import { Quill } from 'quill';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Topic, TopicSummary } from '../topic-list/topic/topic-data.model';
import { AuthService } from '../../../authentication/auth.service';
import { timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ForumService } from '../forum.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTagComponent } from '../../../shared/ui-components/new-tag/new-tag.component';
import { Tag } from '../../../shared/ui-components/tag/tag.model';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.scss']
})
export class NewTopicComponent implements OnInit {

    @ViewChild('tagModal') tagModal: NewTagComponent;

    newTopicForm: FormGroup;
    editor: Quill;
    removeTagCallback: Function;

    showTitleAutocomplete = false;
    showTagAutocomplete = false;
    tagInputFocused = false;

    selectedTags: Tag[] = [];

    foundTopics: TopicSummary[] = [];
    foundTags: Tag[] = [];

    constructor(private authService: AuthService, private forumService: ForumService,
                private modalService: NgbModal, private location: Location) {}

    ngOnInit() {
        this.removeTagCallback = this.removeTag.bind(this);

        this.newTopicForm = new FormGroup({
            title: new FormControl(
                  null,
                  {
                    validators: [ Validators.required ],
                    asyncValidators: [ this.checkTopitTitle() ]
                }
            ),
            tags: new FormControl(
                null,
                {
                    validators: [ this.checkSelectedTags() ],
                    asyncValidators: [ this.checkTagName() ]
                }
            ),
            editor: new FormControl(null, [ Validators.required ])
        });
    }

    onEditorCreated(editor: Quill) {
        this.editor = editor;
    }

    onSubmit() {
        const now = new Date();
        const newTopic: Topic = {
            title: this.newTopicForm.controls['title'].value,
            author: '',
            date: now.toDateString() + ' ' + now.toLocaleTimeString(),
            tags: []
        };
    }

    onContentChanged(editorEvent: { text: string, html: string }) {}

    onTitleFocus() {
        if (this.newTopicForm.controls['title'].value) {
            this.showTitleAutocomplete = true;
        }
    }

    onTagFocus() {
        if (this.newTopicForm.controls['tags'].value) {
            this.showTagAutocomplete = true;
        }
        this.tagInputFocused = true;
    }

    onTitleFocusout() {
        this.showTitleAutocomplete = false;
    }

    onTagFocusout() {
        this.showTagAutocomplete = false;
        this.tagInputFocused = false;
    }

    onTitleKeyup() {
        if (this.newTopicForm.controls['title'].value) {
            this.showTitleAutocomplete = true;
        } else {
            this.showTitleAutocomplete = false;
            this.foundTopics = [];
        }
    }

    onTagKeyup() {
        if (this.newTopicForm.controls['tags'].value) {
            this.showTagAutocomplete = true;
        } else {
            this.showTagAutocomplete = false;
            this.foundTags = [];
        }
    }

    onNewTagEmitter(tag: Tag) {
        this.selectedTags.push(tag);
        this.newTopicForm.controls['tags'].updateValueAndValidity();
    }

    removeTag(removedTag: Tag) {
        this.selectedTags = this.selectedTags.filter((tag: Tag) => {
            return !(tag.name === removedTag.name && tag.textColor === removedTag.textColor && tag.bgColor === removedTag.bgColor);
        });

        this.newTopicForm.controls['tags'].updateValueAndValidity();
    }

    // Método activado por el input de título para mostrar Topics con texto
    // similar (para evitar repetir Topics que ya existan)
    checkTopitTitle(time: number = 800) {
        return (titleControl: FormControl) => {
            // timer() se encarga de no activar la validación más de una vez cada X tiempo
            // Muy conveniente para no validar cada vez que se teclee un caracter en el input
            return timer(time).pipe(
                // switchMap() cancela operaciones pendientes si aparece una nueva
                switchMap(() => {
                    const foundTopics = this.forumService.topics;
                    return new Promise(function(resolve) {
                        setTimeout(() => resolve(foundTopics), 500);
                    });
                }),
                map((foundTopics: TopicSummary[]) => {
                    const inputTitle = titleControl.value;

                    if (inputTitle) {
                        foundTopics = foundTopics.filter((topic) => {
                            return !topic.title || topic.title.toLowerCase().indexOf(inputTitle.toLowerCase()) !== -1;
                        });
                    }

                    this.foundTopics = foundTopics;
                    // Devolvemos siempre que no hay error
                    return null;
                })
            );
        };
    }

    checkSelectedTags() {
        return (tagsControl: FormControl) => {
            return (this.selectedTags && this.selectedTags.length > 0) ? null : { tagsRequired: true };
        };
    }

    // Método activado por el input de tags para mostrar Tags con nombre
    // similar (para evitar repetir Tags que ya existan)
    checkTagName(time: number = 800) {
        return (tagsControl: FormControl) => {
            // timer() se encarga de no activar la validación más de una vez cada X tiempo
            // Muy conveniente para no validar cada vez que se teclee un caracter en el input
            return timer(time).pipe(
                // switchMap() cancela operaciones pendientes si aparece una nueva
                switchMap(() => {
                    const foundTags = [];
                    this.forumService.topics.forEach(topic => {
                        foundTags.push(...topic.tags);
                    });

                    return new Promise(function(resolve) {
                        setTimeout(() => resolve(foundTags), 500);
                    });
                }),
                map((foundTags: Tag[]) => {
                    const tagValue = tagsControl.value;

                    if (tagValue) {
                        foundTags = foundTags.filter((tag) => {
                            return !tag.name || tag.name.toLowerCase().indexOf(tagValue.toLowerCase()) !== -1;
                        });
                    }

                    this.foundTags = foundTags;
                    // Devolvemos siempre que no hay error
                    return null;
                })
            );
        };
    }

    back() {
        this.location.back();
    }
}
