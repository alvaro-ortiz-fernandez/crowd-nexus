import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UiService } from '../ui.service';
import { BackgroundColor, LayoutOptions, Theme } from '../../shared/navigation/sidebar/layout-options.model';
import { Subscription } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Component({
    selector: 'app-full-layout',
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit, OnDestroy {

    private sidebarChangeSubscription: Subscription;
    public config: PerfectScrollbarConfigInterface = {};
    public options: LayoutOptions;

    public isCollapsed = false;
    public innerWidth: any;
    public defaultSidebar: any;
    public showSettings = false;
    public showMobileMenu = false;
    public isDashboard = false;
    public tabStatus = 'justified';

    constructor(private router: Router, private uiService: UiService) {}

    ngOnInit() {
        this.options = this.uiService.uiSettings;
        this.sidebarChangeSubscription = this.uiService.settingsSidebarChange
            .subscribe(() => this.toggleSidenav());

        this.defaultSidebar = this.options.sidebartype;
        this.handleSidebar();

        if (this.router.url === '/' || this.router.url === 'dashboard' || this.router.url === '/dashboard') {
            this.isDashboard = true;
        } else {
            this.isDashboard = false;
        }
    }

    ngOnDestroy() {
        this.sidebarChangeSubscription.unsubscribe();
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
