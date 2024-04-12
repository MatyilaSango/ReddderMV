import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PostComponent } from "../post/post.component";
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../Store/App';
import { selectPostOnFullscreen } from '../Store/Selectors/fullscreenPost.selector';
import { selectData } from '../Store/Selectors/search.selector';
import { PAGES } from '../enums/enums';
import { selectBookmarkPosts } from '../Store/Selectors/bookmark.selector';
import { FullscreenPostService } from './fullscreen-post.service';


@Component({
    selector: 'app-fullscreen-post',
    templateUrl: './fullscreen-post.page.html',
    styleUrls: ['./fullscreen-post.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PostComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FullscreenPostPage {
  post: Post = {} as Post;
  posts: Post[] = [];

  constructor(private store: Store<AppState>, private fullscreenPostService: FullscreenPostService) { 
    this.store.select(selectPostOnFullscreen).forEach(posts => {
      this.post = posts
    })

    switch(this.post.pageFrom){
      case PAGES.home:
        this.store.select(selectData).forEach(posts => {
          this.posts = posts
        })
        break;

      case PAGES.bookmarks:
        this.store.select(selectBookmarkPosts).forEach(posts => {
          this.posts = posts
        })
    }
    this.posts = fullscreenPostService.getReOrganisedData(this.post, this.posts)
  }
}
