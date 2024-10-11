import {Component, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {NavComponent} from '../shared/nav/nav.component';
import {RouterLink} from "@angular/router";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HorizontalOvercompensation} from '../shared/horizental-seperator/horizontal-overcompensation.component';
import {NavigatorComponent} from '../shared/navigator/navigator.component';
import {StoreItemComponent} from './store-item-container/store-item/store-item.component';
import {StoreItemContainerComponent} from './store-item-container/store-item-container.component';
import {FooterComponent} from '../shared/footer/footer.component';
import {debounceTime, pipe} from 'rxjs';

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
    StoreItemContainerComponent,
    FooterComponent
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent implements OnInit{
  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  userInput = signal('');
  searchGroup = new FormGroup({
    search: new FormControl(''),
  });
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const searchFormSubscription = this.searchGroup.valueChanges
      .pipe(
        debounceTime(250)
      )
      .subscribe({
        next: value => {
          this.userInput.set(<string>value.search);
        }
      });
    this.destroyRef.onDestroy(() => searchFormSubscription.unsubscribe());
  }

  protected readonly FormControl = FormControl;
}
