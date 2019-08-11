import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollPoint]'
})
export class ScrollPointDirective  {

    @Input() scrollPoint: number;
    @Input() yOffset: number;
    @Input() minWidth: number;

    constructor(
        private renderer: Renderer2,
        private el: ElementRef
    ) {}

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const YScroll = window.pageYOffset;
        const windowWidth = window.innerWidth;

        if (windowWidth > this.minWidth && YScroll > this.scrollPoint) {
            this.renderer.addClass(this.el.nativeElement, 'position-absolute');
            this.renderer.addClass(this.el.nativeElement, 'scrollPoint');

            const YPosition = (YScroll - this.scrollPoint) + this.yOffset;
            this.renderer.setStyle(this.el.nativeElement, 'top', YPosition + 'px');
        } else {
            this.renderer.removeClass(this.el.nativeElement, 'position-absolute');
            this.renderer.removeClass(this.el.nativeElement, 'scrollPoint');

            this.renderer.removeStyle(this.el.nativeElement, 'top');
        }
    }
}
