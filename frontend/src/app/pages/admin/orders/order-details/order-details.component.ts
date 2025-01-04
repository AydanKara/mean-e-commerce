import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../models/order.model';
import { CommonModule } from '@angular/common';
import { DateFormatPipe } from '../../../../pipes/date-format.pipe';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule, DateFormatPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private adminService = inject(AdminService);

  order: Order | null = null;
  loading: boolean = false;

  showStatusDropdown: boolean = false;
  statusOptions: string[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.loading = true;
    this.activateRoute.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) return [];
          return this.orderService.getOrderById(id);
        })
      )
      .subscribe({
        next: (order) => {
          this.loading = false;
          this.order = order;
          console.log(order.user.fullName);
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  toggleStatusDropdown(): void {
    this.showStatusDropdown = !this.showStatusDropdown;
  }

  updateOrderStatus(newStatus: string): void {
    if (this.order?.orderStatus === newStatus) return;

    // Update status via API
    this.adminService.updateOrderStatus(this.order?._id, newStatus).subscribe({
      next: (updatedOrder) => {
        this.order!.orderStatus = updatedOrder.orderStatus;
        this.showStatusDropdown = false; // Hide dropdown after update
        this.loadOrder();
      },
      error: (error) => {
        console.error('Failed to update status', error);
      },
    });
  }
}
