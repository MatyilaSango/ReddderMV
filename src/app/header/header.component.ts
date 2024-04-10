import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonText, IonIcon } from "@ionic/angular/standalone";
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonIcon, IonText, IonToolbar, IonHeader, AsyncPipe, CommonModule]
})
export class HeaderComponent {
  @Input() account!: Observable<string>
  @Input() type!: Observable<string>
  
  constructor() { }
}
