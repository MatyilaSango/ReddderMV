import { Component } from '@angular/core';
import { IonTabs, IonIcon, IonTabBar, IonTabButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { home, search, bookmarks } from "ionicons/icons"
import { Router } from "@angular/router"

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabButton, IonTabBar, IonIcon, IonTabs, ]
})
export class TabsPage{

  constructor(private router: Router) { 
    addIcons({home, search, bookmarks})
  }

  navigate(page: string){
    this.router.navigate([page])
  }
}
