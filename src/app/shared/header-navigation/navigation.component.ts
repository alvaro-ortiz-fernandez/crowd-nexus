import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UiService } from '../../layouts/ui.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit, OnDestroy {

    @Output() toggleSidebar = new EventEmitter<void>();
    public config: PerfectScrollbarConfigInterface = {};
    public showSearch = false;
    private authenticated = false;

    // Notificaciones
    notifications: Object[] = [
        {
            btn: 'btn-danger',
            icon: 'ti-link',
            title: 'Luanch Admin',
            subject: 'Just see the my new admin!',
            time: '9:30 AM'
        },
        {
            btn: 'btn-success',
            icon: 'ti-calendar',
            title: 'Event today',
            subject: 'Just a reminder that you have event',
            time: '9:10 AM'
        },
        {
            btn: 'btn-info',
            icon: 'ti-settings',
            title: 'Settings',
            subject: 'You can customize this template as you want',
            time: '9:08 AM'
        },
        {
            btn: 'btn-primary',
            icon: 'ti-user',
            title: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:00 AM'
        }
    ];

    // Mensajes
    mymessages: Object[] = [
        {
            useravatar: 'assets/images/users/1.jpg',
            status: 'online',
            from: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:30 AM'
        },
        {
            useravatar: 'assets/images/users/2.jpg',
            status: 'busy',
            from: 'Sonu Nigam',
            subject: 'I have sung a song! See you at',
            time: '9:10 AM'
        },
        {
            useravatar: 'assets/images/users/2.jpg',
            status: 'away',
            from: 'Arijit Sinh',
            subject: 'I am a singer!',
            time: '9:08 AM'
        },
        {
            useravatar: 'assets/images/users/4.jpg',
            status: 'offline',
            from: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:00 AM'
        }
    ];

    constructor(private authService: AuthService, private uiService: UiService) {}

    ngOnInit() {
        this.authenticated = this.authService.isAuth();
        this.authService.authChange.subscribe(auth => this.authenticated = auth);
    }

    ngOnDestroy() {
        this.authService.authChange.unsubscribe();
    }

    toggleSettingsSidebar() {
        this.uiService.settingsSidebarChange.emit();
    }
}
