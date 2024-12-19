import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../../models/product.model';
import { CategoryService } from '../../../../core/services/category.service';
import { AdminService } from '../../../../core/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../../../../core/services/shop.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';

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
  private snackbar = inject(SnackbarService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEditMode: boolean = false; // To distinguish between Create and Edit
  productId: string | null = null; // Product ID for editing
  successMessage: string = '';
  errorMessage: string = '';
  formErrors: { [key: string]: string } = {}; // To store validation errors

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
        this.snackbar.error(this.errorMessage);
      },
    });
  }

  validateForm(): boolean {
    this.formErrors = {}; // Clear previous errors
    if (!this.product.name.trim()) {
      this.formErrors['name'] = 'Product name is required.';
    }
    if (!this.product.description.trim()) {
      this.formErrors['description'] = 'Product description is required.';
    }
    if (this.product.price <= 0) {
      this.formErrors['price'] = 'Price must be greater than 0.';
    }
    if (this.product.stock < 0) {
      this.formErrors['stock'] = 'Stock cannot be negative.';
    }
    if (!this.product.category._id) {
      this.formErrors['category'] = 'Category is required.';
    }
    if (!this.product.gender) {
      this.formErrors['gender'] = 'Gender is required.';
    }
    if (!this.product.brand.trim()) {
      this.formErrors['brand'] = 'Brand is required.';
    }
    if (!this.product.images || !this.product.images.toString().trim()) {
      this.formErrors['images'] = 'At least one image URL is required.';
    }

    return Object.keys(this.formErrors).length === 0;
  }

  // Handle form submission for both Create and Edit
  onSubmit(): void {
    if (!this.validateForm()) {
      this.errorMessage =
        'Please fix the errors in the form before submitting.';
      this.snackbar.error(this.errorMessage);
      return;
    }

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
        this.snackbar.success(response.message);
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        this.errorMessage = 'An error occurred while creating the product.';
        this.snackbar.error(error.error.message);
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
        this.snackbar.success(response.message);
        this.router.navigate(['/admin/products']); // Redirect to product list after update
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.errorMessage = 'An error occurred while updating the product.';
        this.snackbar.error(error.error.message);
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
    this.formErrors = {};
    this.errorMessage = '';
  }
}
