import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  imports: [RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css',
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  orderId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.orderService.setOrderPlaced(false);
  }
}
