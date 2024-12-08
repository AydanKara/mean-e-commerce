import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ShopService } from '../../../core/services/shop.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProductQueryParams } from '../../../models/product-query-params.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, MatIcon, MatPaginator],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private shopService = inject(ShopService);
  // List of products
  products: Product[] = [];

  // For pagination
  totalProducts: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  queryParams = new ProductQueryParams();


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.shopService.getAllProducts(this.queryParams).subscribe({
      next: (response) => {
        this.products = response.products;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalProducts = response.totalProducts;
      },
      error: (error) => console.log(error),
    });
  }
  onAddProduct() {
    // Navigate to product creation form
  }

  handlePageEvent(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.getProducts();
  }
}
