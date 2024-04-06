import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard } from '@ionic/angular/standalone';
import { SearchComponent } from "../search/search.component";
import { Observable } from 'rxjs';
import { AppState } from '../states/App';
import { Store } from '@ngrx/store';
import { selectData } from '../states/search/search.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { HeaderComponent } from "../header/header.component";
import { Post } from '../types/types';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonCard, IonHeader, IonToolbar, IonTitle, IonContent, SearchComponent, AsyncPipe, PostComponent, CommonModule, HeaderComponent]
})
export class HomePage {
  posts$: Observable<Post[]>
  constructor(private store: Store<AppState>) {
    this.posts$ = this.store.select(selectData)
  }
}
