import { Component, Input } from '@angular/core';
import { IonCard, IonText, IonIcon } from "@ionic/angular/standalone";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { savePost } from '../states/bookmark/bookmark.action';
import { selectBookmarkPosts } from '../states/bookmark/bookmark.selector';
import { personCircle } from "ionicons/icons"
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonCard, AsyncPipe, CommonModule, ActionButtonComponent]
})
export class PostComponent {
  @Input() post!: Post;
  
  playing: boolean;
  videoElement!: HTMLVideoElement;
  isMuted: boolean;

  constructor(private store: Store<AppState>) {  
    addIcons({personCircle}) 
    this.playing = false;
    this.isMuted = false;
  }

  handleVideoOnLoad(e: Event){
    const videoElement: HTMLVideoElement = e.currentTarget as HTMLVideoElement
    this.videoElement = videoElement
  }

  handleVideoControls(){
    this.playing ? this.videoElement.pause() : this.videoElement.play()
    this.playing = !this.videoElement.paused
  }

  handleVideoAudioMute(){
    this.videoElement.muted = !this.videoElement.muted
    this.isMuted = this.videoElement.muted
  }

  bookmarkPost(){
    this.store.dispatch(savePost(this.post))
    this.store.select(selectBookmarkPosts).forEach(state => {
      localStorage.setItem("bookmark", JSON.stringify(state))
    })
  }
}
