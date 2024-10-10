import { Component } from '@angular/core';
import {NavComponent} from '../shared/nav/nav.component';
import {LandingHeroComponent} from './landing-hero/landing-hero.component';
import {LandingFooterComponent} from './landing-footer/landing-footer.component';
import {RouterLink} from '@angular/router';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavComponent,
    LandingHeroComponent,
    LandingFooterComponent,
    RouterLink,
    FaIconComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
}
