import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonText, IonIcon } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { AppState } from '../states/App';
import { Store } from '@ngrx/store';
import { selectAccount, selectData, selectType } from '../states/search/search.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostComponent } from '../post/post.component';
import { HeaderComponent } from "../header/header.component";
import { Post } from '../types/types';
import { personSharp } from "ionicons/icons"
import { addIcons } from 'ionicons';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonIcon, IonText, IonCard, IonHeader, IonToolbar, IonTitle, IonContent, AsyncPipe, PostComponent, CommonModule, HeaderComponent]
})
export class HomePage {
  posts$: Observable<Post[]>
  account: Observable<string>
  type: Observable<string>
  
  constructor(private store: Store<AppState>) {
    addIcons({ personSharp })
    this.posts$ = this.store.select(selectData)
    this.account = this.store.select(selectAccount)
    this.type = this.store.select(selectType)
  }
}
