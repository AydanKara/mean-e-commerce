import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  order: Order | null = null;

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
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
          console.log(order);
          this.order = order;
        },
        error: (err) => console.error(err),
      });
  }
}
