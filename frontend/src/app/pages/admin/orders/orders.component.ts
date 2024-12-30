import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Order } from '../../../models/order.model';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, MatTooltipModule, DateFormatPipe, RouterModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private adminService = inject(AdminService);
  private snackbar = inject(SnackbarService);
  orders: Order[] = [];
  loading: boolean = false;

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
}
