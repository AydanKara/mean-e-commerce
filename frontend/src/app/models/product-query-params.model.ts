import { HttpParams } from '@angular/common/http';

export class ProductQueryParams {
  searchTerm: string = ''; // Search term
  categories: string[] = []; // Categories filter
  brands: string[] = []; // Brands filter
  genders: string[] = []; // Genders filter
  sort: string = 'name'; // Sort options
  priceRange: string = ''; // Optional price range
  page: number = 1; // Pagination
  limit: number = 10; // Items per page

  constructor(init?: Partial<ProductQueryParams>) {
    // Allows initialization with partial data
    Object.assign(this, init);
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('keyword', this.searchTerm)
      .set('category', this.categories.join(', '))
      .set('brand', this.brands.join(', '))
      .set('gender', this.genders.join(', '))
      .set('sort', this.sort)
      .set('price', this.priceRange)
      .set('page', this.page.toString())
      .set('limit', this.limit.toString());

    return params;
  }
}
