import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Home',
    icon: 'mdi mdi-view-dashboard',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/apps/email',
    title: 'Posts',
    icon: 'mdi mdi-clipboard-outline',
    class: 'has-arrow',
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '/dashboard',
        title: 'Category 1',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard',
        title: 'Category 2',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard',
        title: 'Category 3',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '/apps/email',
    title: 'Email',
    icon: 'mdi mdi-email',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/apps/chat',
    title: 'Chat App',
    icon: 'mdi mdi-comment-processing-outline',
    class: '',
    ddclass: '',
    extralink: false,
    submenu: []
  }
];
