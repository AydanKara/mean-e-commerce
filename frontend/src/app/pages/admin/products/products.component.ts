import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ShopService } from '../../../core/services/shop.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductQueryParams } from '../../../models/product-query-params.model';
import { AdminService } from '../../../core/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, MatIcon, MatPaginator],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private shopService = inject(ShopService);
  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);

  // List of products
  products: Product[] = [];

  // For pagination
  totalProducts: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  queryParams = new ProductQueryParams();

  loading: boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.shopService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.products = response.products;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalProducts = response.totalProducts;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  handlePageEvent(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.getProducts();
  }

  deleteProduct(productId: string) {
    // Show confirmation or directly delete
    if (confirm('Are you sure you want to delete this product?')) {
      this.adminService.deleteProduct(productId).subscribe({
        next: (response) => {
          // Successfully deleted product
          this.snackBar.open('Product deleted successfully', 'Close', {
            duration: 2000,
          });
          // Remove deleted product from the list
          this.products = this.products.filter(
            (product) => product._id !== productId
          );
          // Optionally, you can re-fetch the products list in case the backend state has changed
          this.getProducts();
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.snackBar.open('Error deleting product', 'Close', {
            duration: 2000,
          });
        },
      });
    }
  }
}
