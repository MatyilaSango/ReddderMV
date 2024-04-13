import { Component, Input } from '@angular/core';
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { bookmarkOutline, thumbsDownOutline, optionsOutline, thumbsUpOutline, playCircle, volumeHigh, volumeMute, expandOutline } from "ionicons/icons"

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
    addIcons({thumbsUpOutline, thumbsDownOutline, bookmarkOutline, playCircle, volumeHigh, volumeMute, expandOutline, optionsOutline})
  }

}
