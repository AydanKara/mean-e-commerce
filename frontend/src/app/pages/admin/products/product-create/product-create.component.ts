import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../models/product.model';
import { CategoryService } from '../../../../core/services/category.service';
import { AdminService } from '../../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../../../core/services/shop.service';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css',
})
export class ProductCreateComponent implements OnInit {
  public categoryService = inject(CategoryService);
  private adminService = inject(AdminService);
  private shopService = inject(ShopService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode: boolean = false; // To distinguish between Create and Edit
  productId: string | null = null; // Product ID for editing
  successMessage: string = '';
  errorMessage: string = '';

  product: Product = {
    _id: '',
    name: '',
    description: '',
    price: 0,
    category: { _id: '', name: '', image: '' },
    gender: '',
    brand: '',
    stock: 0,
    ratings: 0,
    numReviews: 0,
    images: [],
    isFeatured: false,
  };

  ngOnInit(): void {
    this.categoryService.getAllCategories();

    // Check if we are in edit mode
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }

  // Load existing product details for editing
  loadProduct(productId: string): void {
    this.shopService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response; // Populate form with existing product data
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Failed to load product details.';
      },
    });
  }

  // Handle form submission for both Create and Edit
  onSubmit(): void {
    if (this.isEditMode) {
      this.onUpdateProduct();
    } else {
      this.onCreateProduct();
    }
  }

  onCreateProduct(): void {
    // Transform the images field into an array
    this.product.images = this.product.images
      .toString()
      .split(',')
      .map((url) => url.trim());

    // Call the AdminService to create the product
    this.adminService.createProduct(this.product).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.resetForm();
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.errorMessage = 'An error occurred while creating the product.';
      },
    });
  }

  // Update an existing product
  onUpdateProduct(): void {
    // Transform image URLs from comma-separated string to array
    this.product.images = this.product.images
      .toString()
      .split(',')
      .map((url) => url.trim());

    this.adminService.updateProduct(this.productId!, this.product).subscribe({
      next: (response) => {
        this.successMessage = 'Product updated successfully!';
        this.router.navigate(['/admin/products']); // Redirect to product list after update
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.errorMessage = 'An error occurred while updating the product.';
      },
    });
  }

  // Reset form after successful submission
  resetForm(): void {
    this.product = {
      _id: '',
      name: '',
      description: '',
      price: 0,
      category: { _id: '', name: '', image: '' },
      gender: '',
      brand: '',
      stock: 0,
      ratings: 0,
      numReviews: 0,
      images: [],
      isFeatured: false,
    };
  }
}
