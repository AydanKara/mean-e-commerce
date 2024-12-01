import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-related-products',
  imports: [CommonModule, MatIcon, RouterModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  @Input() relatedProducts?: Product[] = [];
}
