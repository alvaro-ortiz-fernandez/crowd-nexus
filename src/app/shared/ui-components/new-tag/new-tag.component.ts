import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Tag, TagColor } from '../tag/tag.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.scss']
})
export class NewTagComponent implements OnInit, OnDestroy {

    @ViewChild('tagModal') tagModal: NewTagComponent;
    @Output() onNewTagEmitter = new EventEmitter<Tag>();

    newTagForm: FormGroup;
    newTagFormSubscription: Subscription;

    creatingTag = false;
    hideAlert = true;
    createTagResult = true;

    newTag: Tag = {
        name: 'Example tag',
        bgColor: TagColor.Info,
        textColor: TagColor.Info
    };

    tagColors = [
      {
        class: 'btn-warning',
        value: TagColor.Warning
      },
      {
        class: 'btn-danger',
        value: TagColor.Danger
      },
      {
        class: 'btn-primary',
        value: TagColor.Primary
      },
      {
        class: 'btn-info',
        value: TagColor.Info
      },
      {
        class: 'btn-success',
        value: TagColor.Success
      },
      {
        class: 'btn-dark',
        value: TagColor.Dark
      },
      {
        class: 'btn-light',
        value: TagColor.Light
      }
    ];

    constructor(private modalService: NgbModal) {}

    ngOnInit() {
      this.newTagForm = new FormGroup({
          name: new FormControl(
              null,
              {
                  validators: [ Validators.required ],
                  asyncValidators: [ this.validateTagNameInUse() ]
              }
          ),
          bgColor: new FormControl(null, [ Validators.required ]),
          textColor: new FormControl(null, [ Validators.required ])
      });

      this.newTagFormSubscription = this.newTagForm.valueChanges
          .subscribe((controls: { name: string, bgColor: TagColor, textColor: TagColor }) => {
              this.newTag = {
                  name: controls.name ? controls.name : 'Example tag',
                  bgColor: controls.bgColor ? parseInt(controls.bgColor.toLocaleString(), 10) : TagColor.Info,
                  textColor: controls.textColor ? parseInt(controls.textColor.toLocaleString(), 10) : TagColor.Info
              };
          });
    }

    ngOnDestroy() {
        this.newTagFormSubscription.unsubscribe();
    }

    onSubmit() {
        this.hideAlert = false;
        this.creatingTag = true;
        setTimeout(() => {
            this.creatingTag = false;
            this.createTagResult = true;
            this.onNewTagEmitter.emit(this.newTag);
        }, 2000);
    }

    validateTagNameInUse(time: number = 800) {
        return (tagNameControl: FormControl) => {
            // timer() se encarga de no activar la validación más de una vez cada X tiempo
            // Muy conveniente para no validar cada vez que se teclee un caracter en el input
            return timer(time).pipe(
                // switchMap() cancela operaciones pendientes si aparece una nueva
                switchMap(() => {
                    return new Promise(function(resolve) {
                        setTimeout(() => resolve(tagNameControl.value === 'test'), 400);
                    });
                }),
                map(inUse => {
                    return (!inUse) ? null : { tagNameExists: true };
                })
            );
        };
    }

    show() {
        this.modalService.open(this.tagModal);
    }
}
