import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonText } from "@ionic/angular/standalone";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { Post } from '../types/types';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonText, IonCard, AsyncPipe, CommonModule, ActionButtonComponent]
})
export class PostComponent {
  @Input() post!: Post;
  
  playing: boolean;
  videoElement!: HTMLVideoElement;
  isMuted: boolean;

  constructor() {   
    this.playing = false;
    this.isMuted = false;
  }

  handleVideoOnLoad(e: Event){
    console.log("loaded")
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
}
