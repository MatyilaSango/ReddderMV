import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonList, IonItem, IonSelect, IonSelectOption, IonIcon, IonToast, IonSearchbar } from "@ionic/angular/standalone";
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { storeSearchAccount } from '../states/search/search.actions';
import { SearchComponentService } from './search-component.service';
import { search } from "ionicons/icons"
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { TOAST_MESSAGES, URL_PAGES } from '../enums/enums';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  standalone: true,
  imports: [IonSearchbar, IonToast, IonItem, IonSelect, IonSelectOption, IonList, CommonModule, FormsModule, IonCard, IonIcon]
})
export class SearchComponentComponent{
  name: string;
  type: string;
  data: any[]
  searchService = inject(SearchComponentService);
  router: Router;
  isToastOpen: boolean;
  toastMessage: string;

  constructor(private store: Store<AppState>) { 
    addIcons({search})
    this.name = ""
    this.type = ""
    this.data = []
    this.router = new Router()
    this.isToastOpen = false
    this.toastMessage = ""
  }

  handleInput(e: Event){
    // @ts-ignore
    this.name = e.target.value
  }

  async handleSubmit(e: Event){
    const data = await this.searchService.getData(this.name, this.type)
    this.store.dispatch(storeSearchAccount(data))
    if (data.isFound) {
      this.router.navigate([URL_PAGES.Home])
    } else {
      this.toastMessage = TOAST_MESSAGES.searchAccountNotFound;
      this.isToastOpen = true
    }
  }

  handleHideToast(){
    this.isToastOpen = false
  }
}
