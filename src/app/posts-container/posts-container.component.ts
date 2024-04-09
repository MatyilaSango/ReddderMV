import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/types';
import { PostComponent } from "../post/post.component";
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
    selector: 'app-posts-container',
    templateUrl: './posts-container.component.html',
    styleUrls: ['./posts-container.component.scss'],
    standalone: true,
    imports: [PostComponent, AsyncPipe, CommonModule]
})
export class PostsContainerComponent {
  @Input() posts$!: Observable<Post[]>

  constructor() { }

  HandleScroll(e: Event) {
    // @ts-ignore
    const scrollHeight = e.target.scrollHeight
    // @ts-ignore
    const scrollTop = e.target.scrollTop + e.target.height

    // console.log(scrollHeight, scrollTop )
  }

}
