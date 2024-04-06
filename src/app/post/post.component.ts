import { Component, Input, OnInit } from '@angular/core';
import { IonCard } from "@ionic/angular/standalone";
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [IonCard, AsyncPipe, CommonModule]
})
export class PostComponent {
  @Input() link!: string;
  @Input() type!: string;

  constructor() {   
  }
}
