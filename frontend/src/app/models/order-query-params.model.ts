import { HttpParams } from '@angular/common/http';

export class OrderQueryParams {
  searchTerm: string = ''; // Search term
  status: string[] = []; // Status filter
  dateRange: string = ''; // Date range filter
  paymentMethod: string[] = []; // Payment method filter
  page: number = 1; // Pagination
  limit: number = 10; // Items per page

  constructor(init?: Partial<OrderQueryParams>) {
    // Allows initialization with partial data
    Object.assign(this, init);
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams()
      .set('keyword', this.searchTerm)
      .set('status', this.status.join(','))
      .set('dateRange', this.dateRange)
      .set('paymentMethod', this.paymentMethod.join(','))
      .set('page', this.page.toString())
      .set('limit', this.limit.toString());

    return params;
  }
}
