import {Component, input, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {NgOptimizedImage} from '@angular/common';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FaIconComponent,
    NgOptimizedImage,
    NgbCollapse,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  protected readonly faShoppingCart = faShoppingCart;
  isNavbarCollapsed = true;
  isLandingPage = input.required<boolean>();

  ngOnInit(): void {
    if (!this.isLandingPage) this.isNavbarCollapsed = false;
  }

  get isLandingPageActive() {
    return this.isLandingPage;
  }

  onMenuClicked() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}

