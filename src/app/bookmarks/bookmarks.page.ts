import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { selectBookmarkPosts } from '../states/bookmark/bookmark.selector';
import { Observable } from 'rxjs';
import { PostComponent } from "../post/post.component";
import { PostsContainerComponent } from "../posts-container/posts-container.component";
import { PAGES } from '../enums/enums';

@Component({
    selector: 'app-bookmarks',
    templateUrl: './bookmarks.page.html',
    styleUrls: ['./bookmarks.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, PostComponent, PostsContainerComponent]
})
export class BookmarksPage{
  posts$: Observable<Post[]>
  currentPage: string = PAGES.bookmarks

  constructor(private store: Store<AppState>) { 
    this.posts$ = this.store.select(selectBookmarkPosts)
  }

}
