import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { Category } from '../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatIcon,
    MatButton,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products: Product[] = [];
  selectedSearch: string = '';
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedGenders: string[] = [];
  selectedSort: string = 'name';
  sortOptions = [
    { name: 'Relevance', value: 'relevance' },
    { name: 'Name: A-Z', value: 'name_asc' },
    { name: 'Name: Z-A', value: 'name_desc' },
    { name: 'Price: Low-High', value: 'price_asc' },
    { name: 'Price: High-Low', value: 'price_desc' },
  ];

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
    this.shopService
      .getAllProducts(
        this.selectedSearch,
        this.selectedCategories,
        this.selectedBrands,
        this.selectedGenders,
        this.selectedSort
      )
      .subscribe({
        next: (response) => {
          this.products = response.products;
        },
        error: (error) => console.log(error),
      });
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.selectedSort = selectedOption.value;
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      maxWidth: '100%',
      data: {
        selectedCategories: this.selectedCategories,
        selectedBrands: this.selectedBrands,
        selectedGenders: this.selectedGenders,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.selectedCategories = result.selectedCategories;
          this.selectedBrands = result.selectedBrands;
          this.selectedGenders = result.selectedGenders;
          this.getProducts();
        }
      },
    });
  }
}
