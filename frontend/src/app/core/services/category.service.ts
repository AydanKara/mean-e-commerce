import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:5500/api/categories';
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<{ categories: Category[] }>(this.baseUrl).pipe(
      map((response) => response.categories) // Transform response to only return categories array
    );
  }
}
