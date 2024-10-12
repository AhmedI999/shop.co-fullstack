import {ChangeDetectionStrategy, Component, input, OnInit} from '@angular/core';
import {Product} from '../../store.model';
import {API_IMAGE_PATH} from '../../../app.apiRoutes';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-store-item',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './store-item.component.html',
  styleUrl: './store-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemComponent implements OnInit{
  product = input.required<Product>();
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
  protected readonly faStar = faStar;

  fullStars: number[] = [];
  hasHalfStar: boolean = false;

  ngOnInit(): void {
    this.calculateStars();
  }

  private calculateStars(): void {
    const rating = parseFloat(this.product().rating);
    const fullStarsCount = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    this.fullStars = Array(fullStarsCount).fill(0);
    this.hasHalfStar = hasHalf;
  }

  protected readonly faStarHalfAlt = faStarHalfAlt;
}



