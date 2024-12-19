import { Component, inject, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private snackbar = inject(SnackbarService);
  categories: Category[] = [];
  isEditMode: boolean = false;
  selectedCategory: Category = { _id: '', name: '', image: '' };

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.fetchAllCategories().subscribe({
      next: (response) => {
        this.categories = response.categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.snackbar.error(error.error.message);
      },
    });
  }

  onCreateCategory(form: NgForm): void {
    const { name, image } = form.value;
    this.categoryService.createCategory({ name, image }).subscribe({
      next: (response) => {
        this.snackbar.success('Category created successfully!');
        this.fetchCategories();
        form.reset();
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.snackbar.error(error.error.message);
      },
    });
  }

  onEditCategory(category: Category): void {
    this.isEditMode = true;
    this.selectedCategory = { ...category };
  }

  onUpdateCategory(): void {
    const { _id, name, image } = this.selectedCategory;
    this.categoryService.updateCategory(_id, { name, image }).subscribe({
      next: (response) => {
        this.snackbar.success('Category updated successfully!');
        this.isEditMode = false;
        this.fetchCategories();
      },
      error: (error) => {
        console.error('Error updating category:', error);
        this.snackbar.error(error.error.message);
      },
    });
  }

  onDeleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (response) => {
          this.snackbar.success('Category deleted successfully!');
          this.fetchCategories();
        },
        error: (error) => {
          console.error('Error deleting category:', error);
          this.snackbar.error(error.error.message);
        },
      });
    }
  }
}
