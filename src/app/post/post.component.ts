import { Component, Input } from '@angular/core';
import { IonCard, IonText, IonIcon, IonToast } from "@ionic/angular/standalone";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { Post } from '../types/types';
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { deletePost, savePost } from '../states/bookmark/bookmark.action';
import { selectBookmarkPosts } from '../states/bookmark/bookmark.selector';
import { personCircle } from "ionicons/icons"
import { addIcons } from 'ionicons';
import { MEDIA, PAGES, VOLUME_ICON_NAMES } from '../enums/enums';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonToast, IonIcon, IonText, IonCard, AsyncPipe, CommonModule, ActionButtonComponent]
})
export class PostComponent {
  @Input() post!: Post;
  @Input() currentPage!: string
  
  playing: boolean;
  element!: HTMLVideoElement | HTMLImageElement;
  isMuted: boolean;
  volumeIconName: string;
  isToastOpen: boolean;
  toastMessage: string;

  constructor(private store: Store<AppState>) {  
    addIcons({personCircle}) 
    this.playing = false;
    this.isMuted = false;
    this.volumeIconName = "volume-high"
    this.isToastOpen = false
    this.toastMessage = ""
  }

  handleElementOnLoaded(e: Event){
    switch(this.post._type){
      case MEDIA.video:
        this.element = e.currentTarget as HTMLVideoElement
        break;

      case MEDIA.Gif:
        this.element = e.currentTarget as HTMLImageElement
    }
  }

  handlePlay(){
    switch(this.post._type){
      case MEDIA.video:
        const videoElement = this.element as HTMLVideoElement
        this.playing ? videoElement.pause() : videoElement.play();
        this.playing = !videoElement.paused;
        break;

      case MEDIA.Gif:
        const imageElement = this.element as HTMLImageElement
        this.playing = !this.playing
        imageElement.src = this.playing ? this.post.link : this.post.thumbnail  
    }
  }

  handleVideoAudioMute(){
    const videoElement = this.element as HTMLVideoElement
    videoElement.muted = !videoElement.muted
    this.isMuted = videoElement.muted
    this.volumeIconName = this.isMuted ? VOLUME_ICON_NAMES.VolumeMute : VOLUME_ICON_NAMES.VolumeHigh
  }

  bookmarkPost(){
    switch(this.currentPage){
      case PAGES.home:
        this.store.dispatch(savePost(this.post))
        this.toastMessage = "Post saved!"
        break;

      case PAGES.bookmarks:
        this.store.dispatch(deletePost(this.post))
        this.toastMessage = "Post deleted!"
        break;
    }
    
    this.isToastOpen = true
    this.store.select(selectBookmarkPosts).forEach(state => {
      localStorage.setItem("bookmark", JSON.stringify(state))
    })
  }

  handleHideToast(){
    this.isToastOpen = false
  }

  toFullScreen(){

  }
}
