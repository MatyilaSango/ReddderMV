import { Post, Account, SearchAccount, Tab } from "../types/types";

export interface AppState {
    account: Account;
    bookmarks: Post[];
    fullscreenPost: Post;
    searchAccounts: SearchAccount
    tab: Tab;
}