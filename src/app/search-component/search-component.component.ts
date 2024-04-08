import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonList, IonItem, IonSelect, IonSelectOption, IonIcon } from "@ionic/angular/standalone";
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { storeSearchAccount } from '../states/search/search.actions';
import { SearchComponentService } from './search-component.service';
import { search } from "ionicons/icons"
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  standalone: true,
  imports: [IonItem, IonSelect, IonSelectOption, IonList, CommonModule, FormsModule, IonCard, IonIcon]
})
export class SearchComponentComponent{
  name: string;
  type: string;
  data: any[]
  searchService = inject(SearchComponentService)

  constructor(private store: Store<AppState>) { 
    addIcons({search})
    this.name = ""
    this.type = ""
    this.data = []
  }

  async handleSubmit(e: Event){
    const data = await this.searchService.getData(this.name, this.type)
    this.store.dispatch(storeSearchAccount(data))
    localStorage.setItem("searchAccount", JSON.stringify(data))  
  }
}