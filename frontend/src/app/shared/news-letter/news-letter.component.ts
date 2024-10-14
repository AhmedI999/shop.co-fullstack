import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-news-letter',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './news-letter.component.html',
  styleUrl: './news-letter.component.scss'
})
export class NewsLetterComponent {

  protected readonly faEnvelope = faEnvelope;
}
