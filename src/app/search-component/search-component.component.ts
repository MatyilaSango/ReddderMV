import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonToast, IonSearchbar } from "@ionic/angular/standalone";
import { Store } from '@ngrx/store';
import { AppState } from '../Store/App';
import { SearchComponentService } from '../search-component/search-component.service';
import { search } from "ionicons/icons"
import { addIcons } from 'ionicons';
import { TOAST_MESSAGES, URL_PAGES } from '../enums/enums';
import { storeSearchedAccountsFound } from '../Store/Actions/search.action';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  standalone: true,
  imports: [IonSearchbar, IonToast, IonItem, IonSelect, IonSelectOption, IonList, CommonModule, FormsModule, IonCard, IonIcon]
})
export class SearchComponentComponent{
  name: string;
  data: any[]
  searchService = inject(SearchComponentService);
  isToastOpen: boolean;
  toastMessage: string;

  constructor(private store: Store<AppState>) { 
    addIcons({search})
    this.name = ""
    this.data = []
    this.isToastOpen = false
    this.toastMessage = ""
  }

  handleInput(e: Event){
    // @ts-ignore
    this.name = String(e.target.value).trim()
  }

  async handleSubmit(){
    const data = await this.searchService.getData(this.name)
    this.store.dispatch(storeSearchedAccountsFound({accounts: data.accounts}))
    if (!data.isFound) {
      this.toastMessage = TOAST_MESSAGES.searchAccountNotFound;
      this.isToastOpen = true
    }
  }

  handleHideToast(){
    this.isToastOpen = false
  }
}
