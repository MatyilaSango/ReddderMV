export interface SearchAccountState {
    name: string;
    type_: string
    data: Post[]
}

export interface Post {
    link: string
    _type: string
    ups: number
    downs: number
    title: string
    author: string
}