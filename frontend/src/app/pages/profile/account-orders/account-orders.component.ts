import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderItem } from '../../../models/order.model';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';

@Component({
  selector: 'app-account-orders',
  imports: [CommonModule, RouterModule, DateFormatPipe],
  templateUrl: './account-orders.component.html',
  styleUrl: './account-orders.component.css',
})
export class AccountOrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  orderItems: OrderItem[] = [];

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        this.orders = response;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
}
