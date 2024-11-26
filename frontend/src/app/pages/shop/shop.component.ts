import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from "../../components/product-item/product-item.component";

@Component({
  selector: 'app-shop',
  imports: [ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  products: Product[] = [];

  ngOnInit(): void {
    this.shopService.getAllProducts().subscribe({
      next: (response) => (this.products = response.products),
      error: (error) => console.log(error),
    });
  }
}
