import { Component, Input } from '@angular/core';
import { Tag, TagColor } from './tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {

    @Input('tag') tag: Tag;
    @Input('closable') closable: string;
    @Input('close') close: Function;

    constructor() {}

    getColor(): string {
        const bgColor: string = this.getBackgroundColor();
        const textColor: string = this.getTextColor();

        return bgColor + ' ' + textColor;
    }

    getBackgroundColor(): string {
        switch (this.tag.bgColor) {
            case TagColor.Primary: return 'tag-bg-primary';
            case TagColor.Info:    return 'tag-bg-info';
            case TagColor.Success: return 'tag-bg-success';
            case TagColor.Warning: return 'tag-bg-warning';
            case TagColor.Danger:  return 'tag-bg-danger';
            case TagColor.Light:   return 'tag-bg-light';
            case TagColor.Dark:    return 'tag-bg-dark';
            default:               return 'tag-bg-info';
        }
    }

    getTextColor(): string {
        switch (this.tag.textColor) {
            case TagColor.Primary: return 'tag-text-primary';
            case TagColor.Info:    return 'tag-text-info';
            case TagColor.Success: return 'tag-text-success';
            case TagColor.Warning: return 'tag-text-warning';
            case TagColor.Danger:  return 'tag-text-danger';
            case TagColor.Light:   return 'tag-text-light';
            case TagColor.Dark:    return 'tag-text-dark';
            default:               return 'tag-text-info';
        }
    }
}
