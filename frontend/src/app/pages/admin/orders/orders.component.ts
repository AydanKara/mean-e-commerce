import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Order } from '../../../models/order.model';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ProductQueryParams } from '../../../models/product-query-params.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import {
  MatListOption,
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { FilterDialogComponent } from '../../../components/filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
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
  loading: boolean = false;

  // For pagination
  totalProducts: number = 0;
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

  queryParams = new ProductQueryParams();

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.loading = true;
    this.adminService.getAllOrders().subscribe({
      next: (response) => {
        this.loading = false;
        this.orders = response;
        console.log(this.orders);
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

  onSearchPage() {
    this.fetchOrders();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.queryParams.sort = selectedOption.value;
      this.fetchOrders();
    }
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
        selectedCategories: this.queryParams.categories,
        selectedBrands: this.queryParams.brands,
        selectedGenders: this.queryParams.genders,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.queryParams.categories = result.selectedCategories;
          this.queryParams.brands = result.selectedBrands;
          this.queryParams.genders = result.selectedGenders;
          this.fetchOrders();
        }
      },
    });
  }
}
