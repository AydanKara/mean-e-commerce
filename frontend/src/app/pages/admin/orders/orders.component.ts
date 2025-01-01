import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Order } from '../../../models/order.model';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderQueryParams } from '../../../models/order-query-params.model';

@Component({
  selector: 'app-orders',
  imports: [
    CommonModule,
    MatTooltipModule,
    DateFormatPipe,
    RouterModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private adminService = inject(AdminService);
  private dialogService = inject(MatDialog);
  private snackbar = inject(SnackbarService);
  orders: Order[] = [];
  isSearchActive: boolean = false;
  loading: boolean = false;

  // For pagination
  totalOrders: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  // Sort options
  sortOptions = [
    { name: 'Relevance', value: 'relevance' },
    { name: 'Name: A-Z', value: 'name_asc' },
    { name: 'Name: Z-A', value: 'name_desc' },
    { name: 'Price: Low-High', value: 'price_asc' },
    { name: 'Price: High-Low', value: 'price_desc' },
  ];

  queryParams = new OrderQueryParams();

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;

    this.adminService.getAllOrders(this.queryParams).subscribe({
      next: (response) => {
        this.loading = false;
        this.orders = response.orders;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.totalOrders = response.totalOrders;

        // Check for no results and search activity
        if (this.orders.length === 0 && this.isSearchActive) {
          this.snackbar.success(
            'No orders found for the given search criteria.'
          );
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackbar.error(err.error.message);
        console.error('Error fetching orders:', err);
      },
    });
  }

  updateStatus(orderId: string, newStatus: string) {
    console.log(`Order: ${orderId} updated - status: ${newStatus}`);
  }

  onSearchSubmit() {
    this.isSearchActive = !!this.queryParams.searchTerm?.trim();
    this.queryParams.page = 1; // Reset to first page
    this.fetchOrders();
  }

  handlePageEvent(event: PageEvent) {
    this.queryParams.page = event.pageIndex + 1;
    this.queryParams.limit = event.pageSize;
    this.fetchOrders();
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      maxWidth: '100%',
      data: {
        selectedStatus: this.queryParams.status,
        selectedPaymentMethod: this.queryParams.paymentMethod,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.queryParams.status = result.selectedStatus;
          this.queryParams.paymentMethod = result.selectedPaymentMethod;
          this.queryParams.dateRange = result.dateRange;
          this.fetchOrders();
        }
      },
    });
  }
}
