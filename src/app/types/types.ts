export interface SearchAccountState {
    name: string;
    type_: string;
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
}

export interface ActionSheetButton {
    text: string;
    role?: string;
    data?: {
        action: string
    }
}