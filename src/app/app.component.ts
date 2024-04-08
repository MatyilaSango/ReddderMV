import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonApp, IonRouterOutlet, IonContent, IonToolbar],
})
export class AppComponent {
}
