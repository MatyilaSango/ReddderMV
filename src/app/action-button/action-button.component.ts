import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  standalone: true
})
export class ActionButtonComponent {
  @Input() text!: string | number
  @Input() imgSrc!: string
  @Input() actionFnc!: () => void;

  constructor() { }

}
