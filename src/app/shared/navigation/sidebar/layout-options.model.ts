export class LayoutOptions {

  public theme: string;
  public dir: string;
  public layout: string;
  public sidebartype: string;
  public sidebarpos: string;
  public headerpos: string;
  public boxed: string;
  public navbarbg: string;
  public sidebarbg: string;
  public logobg: string;

  constructor(theme: Theme,
              dir: LayoutDirection,
              sidebarpos: SidebarPosition,
              headerpos: HeaderPosition,
              boxed: BoxedLayout,
              navbarbg: BackgroundColor,
              sidebarbg: BackgroundColor,
              logobg: BackgroundColor) {

    this.theme = theme;
    this.dir = dir;
    this.layout = 'horizontal'; // Valor fijo
    this.sidebartype = 'full'; // Valor fijo
    this.sidebarpos = sidebarpos;
    this.headerpos = headerpos;
    this.boxed = boxed;
    this.navbarbg = navbarbg;
    this.sidebarbg = sidebarbg;
    this.logobg = logobg;
  }
}

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

export enum LayoutDirection {
  LeftToRight = 'ltr',
  RightToLeft = 'rtl'
}

export enum SidebarPosition {
  Fixed = 'fixed',
  Absolute = 'absolute'
}

export enum HeaderPosition {
  Fixed = 'fixed',
  Absolute = 'absolute'
}

export enum BoxedLayout {
  Full = 'full',
  Boxed = 'boxed'
}

export enum BackgroundColor {
  Blue = 'skin1',
  Orange = 'skin2',
  LightBlue = 'skin3',
  Purple = 'skin4',
  Dark = 'skin5',
  Light = 'skin6',
}
