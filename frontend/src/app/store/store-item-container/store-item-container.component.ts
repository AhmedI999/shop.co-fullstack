import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
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
export class StoreItemContainerComponent implements OnInit{
  private storeService = inject(StoreService);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  products = signal<Product[] | undefined>(undefined);
  error = signal('');
  paginatedProducts = signal<Product[]>([]);

  productsPerPage: number = 6;
  currentPage: number = 0;
  pageSizeOptions: number[] = [4, 6, 9];

  private updatePaginatedProducts() {
    this.paginatedProducts.set(this.storeService.updatePaginatedProducts(this.currentPage,
      this.productsPerPage,
      this.products)!);
  }

  ngOnInit(): void {
    this.isFetching.set(true);
    const storeProductsSubscription = this.storeService.loadAvailableProducts()
      .subscribe({
        next: prodcuts => {
          this.products.set(prodcuts);
          // Pagination
          this.updatePaginatedProducts();
        },
        complete: () => this.isFetching.set(false),
        error: (err: Error) => {
          console.error(err.message);
          this.error.set(err.message);
        }
      })
    this.destroyRef.onDestroy(() => storeProductsSubscription.unsubscribe());
  }




  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.productsPerPage = event.pageSize;
    this.updatePaginatedProducts();
  }


}
