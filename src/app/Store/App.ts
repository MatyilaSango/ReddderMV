import { Post, Account, SearchAccount } from "../types/types";

export interface AppState {
    account: Account;
    bookmarks: Post[];
    fullscreenPost: Post;
    searchAccounts: SearchAccount
}