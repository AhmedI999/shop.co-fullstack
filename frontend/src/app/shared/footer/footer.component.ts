import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPhone, faPrint, faTruck, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly faUser = faUser;
  protected readonly faTruck = faTruck;
  protected readonly faPhone = faPhone;
  protected readonly faPrint = faPrint;
}
