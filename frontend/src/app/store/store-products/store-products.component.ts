import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {HorizontalOvercompensation} from '../../shared/horizental-seperator/horizontal-overcompensation.component';
import {NavComponent} from '../../shared/nav/nav.component';
import {NavigatorComponent} from '../../shared/navigator/navigator.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreItemContainerComponent} from '../store-item-container/store-item-container.component';
import {debounceTime} from 'rxjs';
import {RouterLink} from '@angular/router';
import {StoreItemComponent} from '../store-item-container/store-item/store-item.component';
import {FooterComponent} from '../../shared/footer/footer.component';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-store-products',
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
  templateUrl: './store-products.component.html',
  styleUrl: './store-products.component.scss'
})
export class StoreProductsComponent implements OnInit{
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
}
