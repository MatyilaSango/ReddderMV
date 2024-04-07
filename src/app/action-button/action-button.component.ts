import { Component, Input } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { bookmark, thumbsDown, thumbsUp, playCircle } from "ionicons/icons"

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  standalone: true,
  imports: [IonIcon, IonIcon]
})
export class ActionButtonComponent {
  @Input() text!: string | number
  @Input() iconName!: string;
  @Input() iconSize!: string;

  constructor() { 
    addIcons({thumbsUp, thumbsDown, bookmark, playCircle})
  }

}
