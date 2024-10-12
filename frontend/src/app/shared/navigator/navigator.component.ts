import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.scss'
})
export class NavigatorComponent {
  addStorePath = input<string>();
  currentPage = input.required<string>();
}
