import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonText, IonIcon } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { AppState } from '../Store/App';
import { Store } from '@ngrx/store';
import { selectAccount, selectData, selectType } from '../Store/Selectors/account.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { HeaderComponent } from "../header/header.component";
import { Post } from '../types/types';
import { personSharp } from "ionicons/icons"
import { addIcons } from 'ionicons';
import { PostsContainerComponent } from "../posts-container/posts-container.component";
import { PAGES } from '../enums/enums';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonIcon, IonText, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, AsyncPipe, PostComponent, CommonModule, HeaderComponent, PostsContainerComponent]
})
export class HomePage {
  posts$: Observable<Post[]>
  account: Observable<string>
  type: Observable<string>
  currentPage: string = PAGES.home
  
  constructor(private store: Store<AppState>) {
    addIcons({ personSharp })
    this.posts$ = this.store.select(selectData)
    this.account = this.store.select(selectAccount)
    this.type = this.store.select(selectType)
  }
}
