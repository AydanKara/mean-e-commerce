import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../../components/product-item/product-item.component';
import { Category } from '../../models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../../components/filter-dialog/filter-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-shop',
  imports: [ProductItemComponent, MatIcon, MatButton],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products: Product[] = [];
  selectedCategories: string[] = [];
  selectedBrands: string[] = [];
  selectedGenders: string[] = [];

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getAllProducts().subscribe({
      next: (response) => {
        console.log(response.products);
        this.products = response.products;
      },
      error: (error) => console.log(error),
    });

    this.shopService.getAllCategories();
    this.shopService.getBrands();
    this.shopService.getGenders();
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
          console.log(result);
          this.selectedCategories = result.selectedCategories;
          this.selectedBrands = result.selectedBrands;
          this.selectedGenders = result.selectedGenders;
          this.shopService
            .getAllProducts(
              '',
              this.selectedCategories,
              this.selectedBrands,
              this.selectedGenders
            )
            .subscribe({
              next: (response) => (this.products = response.products),
              error: (error) => console.log(error),
            });
        }
      },
    });
  }
}
