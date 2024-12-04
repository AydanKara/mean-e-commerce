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

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http
      .get<{ success: boolean; categories: Category[] }>(this.categoriesUrl)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.categories = response.categories;
            console.log(response);
          } else {
            this.errorMessage = 'Failed to fetch Categories.';
          }
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.errorMessage = 'An error occurred while fetching Categories.';
        },
      });
  }
}
