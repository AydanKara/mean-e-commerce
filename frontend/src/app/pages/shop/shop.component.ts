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
    });
  }
}
