import { Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../types/types';
import { PostComponent } from "../post/post.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { AppState } from '../states/App';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { URL_PAGES } from '../enums/enums';
import { selectAccount, selectType } from '../states/search/search.selector';
import { SearchComponentService } from '../search-component/search-component.service';
import { loadMoreSearchAccount } from '../states/search/search.actions';

@Component({
    selector: 'app-posts-container',
    templateUrl: './posts-container.component.html',
    styleUrls: ['./posts-container.component.scss'],
    standalone: true,
    imports: [PostComponent, AsyncPipe, CommonModule]
})
export class PostsContainerComponent {
  @Input() posts$!: Observable<Post[]>

  isLoadingMore: boolean;
  router: Router
  account: string = ""
  type: string = ""
  searchService = inject(SearchComponentService);

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

  async HandleLoadMorePosts(e: Event) {
    // @ts-ignore
    const scrollHeight = e.target.scrollHeight
    // @ts-ignore
    const scrollTop = e.target.scrollTop + e.target.clientHeight

    if(scrollHeight === scrollTop && (this.router.url === URL_PAGES.Home)){
      this.isLoadingMore = true
      const data = await this.searchService.getData(this.account, this.type)
      this.store.dispatch(loadMoreSearchAccount(data))
      this.isLoadingMore = false
    }
  }
}
