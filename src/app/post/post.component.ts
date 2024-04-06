import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonText } from "@ionic/angular/standalone";
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonText, IonCard, AsyncPipe, CommonModule]
})
export class PostComponent {
  @Input() link!: string;
  @Input() type!: string;
  @Input() likes!: number;
  @Input() title!: string;

  playing: boolean = false
  videoElement!: HTMLVideoElement;

  constructor() {   
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
}
