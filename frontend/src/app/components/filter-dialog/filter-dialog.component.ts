import { Component, inject, Inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { ShopService } from '../../core/services/shop.service';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ShopComponent } from '../../pages/shop/shop.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  imports: [
    CommonModule,
    MatDivider,
    MatSelectionList,
    MatListOption,
    MatButton,
    FormsModule
  ],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css',
})
export class FilterDialogComponent {
  shopService = inject(ShopService);

  // access data
  private dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedCategories: string[] = this.data.selectedCategories;
  selectedBrands: string[] = this.data.selectedBrands;
  selectedGenders: string[] = this.data.selectedGenders;

  applyFilters() {
    this.dialogRef.close({
      selectedCategories: this.selectedCategories,
      selectedBrands: this.selectedBrands,
      selectedGenders: this.selectedGenders,
    });
  }
}
