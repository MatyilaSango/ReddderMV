import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonText } from '@ionic/angular/standalone';
import { HeaderComponent } from "../header/header.component";
import { SearchComponentComponent } from "../search-component/search-component.component";
import { Store } from '@ngrx/store';
import { AppState } from '../Store/App';
import { Router } from '@angular/router';
import { TOAST_MESSAGES, URL_PAGES } from '../enums/enums';
import { SearchService } from './search.service';
import { storeAccount } from '../Store/Actions/account.action';
import { User } from '../types/types';
import { selectSearchedAccounts } from '../Store/Selectors/search.selector';

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
    standalone: true,
    imports: [IonText, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, SearchComponentComponent]
})
export class SearchPage{
  searchService = inject(SearchService);
  searchedAccounts: User[] = [];
  router: Router;
  isToastOpen: boolean;
  toastMessage: string;

  constructor(private store: Store<AppState>) { 
    this.router = new Router()
    this.isToastOpen = false
    this.toastMessage = ""
    this.store.select(selectSearchedAccounts).forEach(a => {
      this.searchedAccounts = a.accounts
    })
  }

  async handleAccount(name: string, type: string){
    const data = await this.searchService.getData(name, type)
    this.store.dispatch(storeAccount(data))
    if (data.isFound) {
      this.router.navigate([URL_PAGES.Home])
    } else {
      this.toastMessage = TOAST_MESSAGES.searchAccountNotFound;
      this.isToastOpen = true
    }
  }
}
