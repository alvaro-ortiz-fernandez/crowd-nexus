export interface Tag {
    name: string;
    bgColor: TagColor;
    textColor: TagColor;
}

export enum TagColor {
    Primary,
    Info,
    Success,
    Warning,
    Danger,
    Light,
    Dark
}
