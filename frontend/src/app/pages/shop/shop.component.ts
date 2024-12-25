import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../../components/product-item/product-item.component';

import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { ProductQueryParams } from '../../models/product-query-params.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { FeaturesComponent } from '../../shared/features/features.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  imports: [
    CommonModule,
    ProductItemComponent,
    FeaturesComponent,
    MatIconModule,
    MatButton,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  // List of products
  products: Product[] = [];

  // For pagination
  totalProducts: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  // Loading flag
  loading: boolean = false;

  // Sort options
  sortOptions = [
    { name: 'Relevance', value: 'relevance' },
    { name: 'Name: A-Z', value: 'name_asc' },
    { name: 'Name: Z-A', value: 'name_desc' },
    { name: 'Price: Low-High', value: 'price_asc' },
    { name: 'Price: High-Low', value: 'price_desc' },
  ];

  // Product query parameters
  queryParams = new ProductQueryParams();

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getAllCategories();
    this.shopService.getBrands();
    this.shopService.getGenders();
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.shopService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.loading = false;
        this.products = response.products;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalProducts = response.totalProducts;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  onSearchPage() {
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.queryParams.sort = selectedOption.value;
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      maxWidth: '100%',
      data: {
        selectedCategories: this.queryParams.categories,
        selectedBrands: this.queryParams.brands,
        selectedGenders: this.queryParams.genders,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.queryParams.categories = result.selectedCategories;
          this.queryParams.brands = result.selectedBrands;
          this.queryParams.genders = result.selectedGenders;
          this.getProducts();
        }
      },
    });
  }
}
