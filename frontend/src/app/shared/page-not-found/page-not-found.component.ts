import { Component } from '@angular/core';
import {NavComponent} from '../nav/nav.component';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    NavComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',

})
export class PageNotFoundComponent {

}
