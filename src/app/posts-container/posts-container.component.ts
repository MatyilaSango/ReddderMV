import { Component, Input, ViewChild, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/types';
import { PostComponent } from "../post/post.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppState } from '../Store/App';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { URL_PAGES } from '../enums/enums';
import { selectAccount, selectType } from '../Store/Selectors/account.selector';
import { IonContent, IonButton } from "@ionic/angular/standalone";
import { SearchService } from '../search/search.service';
import { loadMoreAccount } from '../Store/Actions/account.action';

@Component({
    selector: 'app-posts-container',
    templateUrl: './posts-container.component.html',
    styleUrls: ['./posts-container.component.scss'],
    standalone: true,
    imports: [IonButton, IonContent, PostComponent, AsyncPipe, CommonModule]
})
export class PostsContainerComponent {
  @ViewChild(IonContent) content!: IonContent
  @Input() posts$!: Observable<Post[]>
  @Input() currentPage!: string

  isLoadingMore: boolean;
  router: Router
  account: string = ""
  type: string = ""
  searchService = inject(SearchService);

  constructor(private store: Store<AppState>) { 
    this.isLoadingMore = false
    this.router = new Router()
    this.store.select(selectAccount).forEach(account => {
      this.account =  account
    })
    this.store.select(selectType).forEach(type => {
      this.type = type
    })
  }

  async HandleLoadMorePosts(forceloadMore?: boolean) {
    const contentScollElement = await this.content.getScrollElement()
    const scrollHeight = contentScollElement.scrollHeight
    const scrollTop = contentScollElement.scrollTop + contentScollElement.clientHeight
    if((scrollHeight === scrollTop || forceloadMore) && (this.router.url === URL_PAGES.Home)){
      this.isLoadingMore = true
      const data = await this.searchService.getData(this.account, this.type)
      this.store.dispatch(loadMoreAccount(data))
      this.isLoadingMore = false
    }
  }
}
