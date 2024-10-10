import {Component, OnInit, signal, viewChild} from '@angular/core';
import {NavComponent} from '../shared/nav/nav.component';
import {RouterLink} from "@angular/router";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HorizontalOvercompensation} from '../shared/horizental-seperator/horizontal-overcompensation.component';
import {NavigatorComponent} from '../shared/navigator/navigator.component';
import {StoreItemComponent} from './store-item-container/store-item/store-item.component';
import {StoreItemContainerComponent} from './store-item-container/store-item-container.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    NavComponent,
    RouterLink,
    FaIconComponent,
    FormsModule,
    ReactiveFormsModule,
    HorizontalOvercompensation,
    NavigatorComponent,
    StoreItemComponent,
    StoreItemContainerComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit{
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  ngOnInit(): void {

  }


}
