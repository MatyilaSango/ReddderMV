import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PostComponent } from "../post/post.component";
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { selectPostOnFullscreen } from '../states/fullscreenPost/fullscreenPost.selector';

@Component({
    selector: 'app-fullscreen-post',
    templateUrl: './fullscreen-post.page.html',
    styleUrls: ['./fullscreen-post.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, PostComponent]
})
export class FullscreenPostPage {
  post: Post = {} as Post;

  constructor(private store: Store<AppState>) { 
    this.store.select(selectPostOnFullscreen).forEach(post => {
      this.post = post
    })
  }
}
