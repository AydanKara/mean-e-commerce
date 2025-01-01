import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatNativeDateModule,
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-filter-dialog',
  imports: [
    CommonModule,
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css',
})
export class FilterDialogComponent {
  filterForm: FormGroup;

  statusOptions = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  paymentMethodOptions = ['Credit Card', 'PayPal', 'Cash on Delivery'];

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public fb: FormBuilder,
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize form with passed-in data
    this.filterForm = this.fb.group({
      status: [data.selectedStatus || []],
      paymentMethod: [data.selectedPaymentMethod || []],
      dateRange: this.fb.group({
        start: [null],
        end: [null],
      }),
    });
  }

  applyFilters(): void {
    const formData = this.filterForm.value;

    const startDate = this.range.value.start
      ? new Date(this.range.value.start).toISOString()
      : null;
    const endDate = this.range.value.end
      ? new Date(this.range.value.end).toISOString()
      : null;

    const filters = {
      selectedStatus: formData.status,
      selectedPaymentMethod: formData.paymentMethod,
      dateRange: startDate && endDate ? `${startDate},${endDate}` : null,
    };
    console.log(filters.dateRange);
    this.dialogRef.close(filters);
  }

  resetToDefaultValues() {
    this.filterForm.reset({
      status: [this.data.selectedStatus || []],
      paymentMethod: [this.data.selectedPaymentMethod || []],
      dateRange: this.fb.group({
        start: [null],
        end: [null],
      }),
    });
  }
}
