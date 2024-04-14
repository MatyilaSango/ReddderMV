export interface User {
    name: string;
    type_: string;
}

export interface SearchAccount {
    accounts: User[]
}

export interface Account extends User{
    data: Post[];
    isFound: boolean;
}

export interface Post {
    link: string
    _type: string
    ups: number
    downs: number
    title: string
    author: string
    thumbnail: string
    pageFrom?: string
    source: string
}

export interface ActionSheetButton {
    text: string;
    icon?: string;
    role?: string;
    data?: {
        action: string
    }
    handler?: () => void;
}