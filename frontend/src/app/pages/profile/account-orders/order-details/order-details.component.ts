import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../models/order.model';
import { CommonModule, formatDate } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';
import { DateFormatPipe } from '../../../../pipes/date-format.pipe';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule, RouterModule, DateFormatPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private userService = inject(UserService);

  order: Order | null = null;
  userName: string | undefined = '';
  loading: boolean = false;

  ngOnInit(): void {
    this.loadOrder();
    this.getUserName();
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
        },
        error: (err) => {
          this.loading = false;
          console.error(err);
        },
      });
  }

  getUserName() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userName = user.fullName;
    });
  }
}
