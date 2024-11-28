import { Component, inject, Inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ShopService } from '../../core/services/shop.service';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../../pages/shop/shop.component';

@Component({
  selector: 'app-filter-dialog',
  imports: [
    CommonModule,
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css',
})
export class FilterDialogComponent {
  shopService = inject(ShopService);
}
