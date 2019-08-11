import { EventEmitter, Injectable, Output } from '@angular/core';
import {
  BackgroundColor,
  BoxedLayout,
  HeaderPosition,
  LayoutDirection,
  LayoutOptions,
  SidebarPosition,
  Theme
} from '../shared/navigation/sidebar/layout-options.model';

@Injectable()
export class UiService {

    @Output() settingsSidebarChange: EventEmitter<void> = new EventEmitter<void>();

    uiSettings: LayoutOptions = new LayoutOptions(
        Theme.Light,
        LayoutDirection.LeftToRight,
        SidebarPosition.Fixed,
        HeaderPosition.Fixed,
        BoxedLayout.Boxed,
        BackgroundColor.Blue,
        BackgroundColor.Light,
        BackgroundColor.Blue
    );

    constructor() {}
}
