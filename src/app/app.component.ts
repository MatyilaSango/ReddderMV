import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonApp, IonRouterOutlet, SearchComponent, IonContent, IonToolbar],
})
export class AppComponent {
}
