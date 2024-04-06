import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonToolbar, IonHeader]
})
export class HeaderComponent {

  constructor() { }
}
