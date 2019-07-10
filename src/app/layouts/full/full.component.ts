import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UiService } from '../ui.service';
import { BackgroundColor, LayoutOptions, Theme } from '../../shared/sidebar/layout-options.model';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  public options: LayoutOptions;

  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public tabStatus = 'justified';

  constructor(public router: Router, private uiService: UiService) {
    this.options = uiService.uiSettings;
    this.uiService.settingsSidebarChange.subscribe(() => this.toggleSidenav());
  }

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/dashboard/classic']);
    }
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;
      default:
    }
  }

  toggleSidenav() {
    this.showSettings = !this.showSettings;
  }

  toggleTheme() {
    if (this.options.theme === Theme.Light) {
      this.options.theme = Theme.Dark;
      this.options.sidebarbg = BackgroundColor.Dark;
    } else {
      this.options.theme = Theme.Light;
      this.options.sidebarbg = BackgroundColor.Light;
    }
  }
}
