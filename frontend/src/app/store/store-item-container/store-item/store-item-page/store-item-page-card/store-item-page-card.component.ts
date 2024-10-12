import {ChangeDetectionStrategy, Component, input, OnInit} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCheckCircle, faEllipsisH, faMinus, faPlus, faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../../../store.model';
import {API_IMAGE_PATH} from '../../../../../app.apiRoutes';

@Component({
  selector: 'app-store-item-page-card',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './store-item-page-card.component.html',
  styleUrl: './store-item-page-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreItemPageCardComponent implements OnInit{
  protected readonly faStar = faStar;
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly faStarHalfAlt = faStarHalfAlt;
  protected readonly faEllipsisH = faEllipsisH;
  protected readonly faCheckCircle = faCheckCircle;

  product = input.required<Product>()
  protected readonly API_IMAGE_PATH = API_IMAGE_PATH;
  fullStars: number[] = [];
  hasHalfStar: boolean = false;

  private calculateStars(): void {
    const rating = parseFloat(this.product().rating);
    const fullStarsCount = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    this.fullStars = Array(fullStarsCount).fill(0);
    this.hasHalfStar = hasHalf;
  }

  ngOnInit(): void {
    this.calculateStars();
  }


}
