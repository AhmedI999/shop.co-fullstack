import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from './shared/nav/nav.component';
import {LandingComponent} from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
