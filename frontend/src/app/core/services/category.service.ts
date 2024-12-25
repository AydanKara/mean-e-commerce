import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}/categories`;
  categories: Category[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  getAllCategories() {
    this.loading = true;
    return this.http
      .get<{ success: boolean; categories: Category[] }>(this.categoriesUrl)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.loading = false;
            this.categories = response.categories;
          } else {
            this.loading = false;
            this.errorMessage = 'Failed to fetch Categories.';
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Error fetching products:', error);
          this.errorMessage = 'An error occurred while fetching Categories.';
        },
      });
  }

  // Fetch all categories
  fetchAllCategories(): Observable<{
    success: boolean;
    categories: Category[];
  }> {
    return this.http.get<{ success: boolean; categories: Category[] }>(
      this.categoriesUrl
    );
  }

  // Create a new category
  createCategory(
    category: Pick<Category, 'name' | 'image'>
  ): Observable<{ success: boolean; category: Category }> {
    return this.http.post<{ success: boolean; category: Category }>(
      this.categoriesUrl,
      category,
      { withCredentials: true }
    );
  }

  // Update an existing category
  updateCategory(
    categoryId: string,
    category: Pick<Category, 'name' | 'image'>
  ): Observable<{ success: boolean; category: Category }> {
    return this.http.put<{ success: boolean; category: Category }>(
      `${this.categoriesUrl}/${categoryId}`,
      category,
      { withCredentials: true }
    );
  }

  // Delete a category
  deleteCategory(
    categoryId: string
  ): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(
      `${this.categoriesUrl}/${categoryId}`,
      { withCredentials: true }
    );
  }
}
