import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonCard, IonList, IonItem, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { Store } from '@ngrx/store';
import { AppState } from '../states/App';
import { storeSearchAccount } from '../states/search/search.actions';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [IonItem, IonSelect, IonSelectOption, IonList, CommonModule, FormsModule, IonCard]
})
export class SearchComponent {
  name: string;
  type: string;
  data: any[]
  searchService = inject(SearchService)

  constructor(private store: Store<AppState>) { 
    this.name = ""
    this.type = ""
    this.data = []
  }

  async handleSubmit(e: Event){
    const data = await this.searchService.getData(this.name, this.type)
    this.store.dispatch(storeSearchAccount(data))
  }
}
