import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Home',
    icon: 'mdi mdi-view-dashboard',
    class: 'has-arrow',
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '/dashboard/classic',
        title: 'Classic',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/analytical',
        title: 'Analytical',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/cryptocurrency',
        title: 'Cryptocurrency',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/overview',
        title: 'Overview',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/ecommerce',
        title: 'Ecommerce',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/sale',
        title: 'Sale',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/general',
        title: 'General',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/trendy',
        title: 'Trendy',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/campaign',
        title: 'Campaign',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/modern',
        title: 'Modern',
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
    title: 'Posts',
    icon: 'mdi mdi-clipboard-outline',
    class: 'has-arrow',
    ddclass: '',
    extralink: false,
    submenu: [
      {
        path: '/dashboard/classic',
        title: 'Category 1',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/analytical',
        title: 'Category 2',
        icon: 'mdi mdi-adjust',
        class: '',
        ddclass: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/dashboard/cryptocurrency',
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
