import {Component, input, OnInit, signal} from '@angular/core';
import {NgClass} from '@angular/common';

import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-message-alert',
  standalone: true,
  imports: [
    NgClass,

  ],
  templateUrl: './message-alert.component.html',
  styleUrl: './message-alert.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MessageAlertComponent implements OnInit{
  message = input.required<string>();
  type = input.required<'success' | 'failure'>();
  isVisible = signal(false);
  fadeOut = signal(false);

  ngOnInit(): void {
    this.isVisible.set(true);
    // Display for 2 seconds, then trigger fade-out animation
    setTimeout(() => {
      this.fadeOut.set(true);
      setTimeout(() => {
        this.isVisible.set(false);
      }, 500); // Wait for the animation to finish before hiding
    }, 2000);
  }


}
