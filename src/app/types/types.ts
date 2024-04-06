export interface SearchAccountState {
    name: string;
    type_: string
    data: Post[]
}

export interface Post {
    link: string
    type: string
}