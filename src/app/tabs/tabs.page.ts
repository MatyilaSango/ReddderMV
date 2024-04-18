import { Component } from '@angular/core';
import { IonTabs, IonIcon, IonTabBar, IonTabButton } from "@ionic/angular/standalone";
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { addIcons } from 'ionicons';
import { home, search, bookmarks } from "ionicons/icons"
import { AppState } from '../Store/App';
import { selectTabMenuVissibility } from '../Store/Selectors/tab.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonIcon, IonTabs, AsyncPipe]
})
export class TabsPage{
  shouldShowMenu: Observable<boolean>

  constructor(private store: Store<AppState>) { 
    addIcons({home, search, bookmarks})
    this.shouldShowMenu = this.store.select(selectTabMenuVissibility)
  }
}
