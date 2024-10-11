import {Component, DestroyRef, effect, inject, input, OnInit, signal} from '@angular/core';
import {StoreItemComponent} from "./store-item/store-item.component";
import {StoreService} from '../store.service';
import {Product} from '../store.model';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-store-item-container',
  standalone: true,
  imports: [
    StoreItemComponent,
    MatPaginatorModule,
  ],
  templateUrl: './store-item-container.component.html',
  styleUrl: './store-item-container.component.scss'
})
export class StoreItemContainerComponent implements OnInit {
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  products = signal<Product[] | undefined>(undefined);
  error = signal('');
  paginatedProducts = signal<Product[]>([]);
  userInput = input<string>();

  productsPerPage: number = 6;
  currentPage: number = 0;
  pageSizeOptions: number[] = [4, 6, 9];
  filteredProductsLength: number = 0;

  private updatePaginatedProducts() {
    this.filterAndPaginateProducts();
  }

  private filterProducts(): Product[] {
    const searchTerm = this.userInput()!.toLowerCase();
    return this.products()?.filter(product =>
      product.details.title.toLowerCase().includes(searchTerm)
    ) || [];
  }

  private filterAndPaginateProducts() {
    const filteredProducts = this.filterProducts();
    this.filteredProductsLength = filteredProducts.length;
    const start = this.currentPage * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.paginatedProducts.set(filteredProducts.slice(start, end));

    if (start >= this.filteredProductsLength && this.currentPage > 0) {
      this.currentPage = 0;
      this.paginatedProducts.set(filteredProducts.slice(0, this.productsPerPage));
    }
  }

  constructor() {
    effect(() => {
      this.currentPage = 0;
      this.filterAndPaginateProducts();
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.isFetching.set(true);
    const storeProductsSubscription = this.storeService.loadAvailableProducts()
      .subscribe({
        next: prodcuts => {
          this.products.set(prodcuts);
          this.updatePaginatedProducts();
        },
        complete: () => this.isFetching.set(false),
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      });
    this.destroyRef.onDestroy(() => storeProductsSubscription.unsubscribe());
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.productsPerPage = event.pageSize;
    this.updatePaginatedProducts();
  }
}

