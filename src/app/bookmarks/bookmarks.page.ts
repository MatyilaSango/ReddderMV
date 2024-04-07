import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../search/search.component";
import { TabsComponent } from "../tabs/tabs.component";
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { selectBookmarkPosts } from '../states/bookmark/bookmark.selector';
import { Observable } from 'rxjs';
import { PostComponent } from "../post/post.component";

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.page.html',
    styleUrls: ['./bookmarks.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, SearchComponent, TabsComponent, PostComponent]
})
export class BookmarksPage{
  posts$: Observable<Post[]>

  constructor(private store: Store<AppState>) { 
    this.posts$ = this.store.select(selectBookmarkPosts)
    this.posts$.forEach(p => console.log(p))
  }

}
