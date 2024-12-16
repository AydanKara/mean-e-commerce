import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'formatDate', // Pipe name to use in templates
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: string | number | Date | null | undefined,
    format: string = 'dd MMM, yyyy', // Default format
    locale: string = 'en-US', // Default locale
    timezone?: string // Optional timezone
  ): string {
    if (!value) {
      return ''; // Handle cases where the input value is null or undefined
    }
    return formatDate(value, format, locale, timezone);
  }
}

/* 
Example Outputs
Given a date value like 2024-12-14T20:07:41.117Z, the pipe will output:

Format: 'dd MMM, yyyy' → 14 Dec, 2024
Format: 'yyyy-MM-dd' → 2024-12-14
Format: 'EEEE, dd MMM yyyy' → Saturday, 14 Dec 2024
*/
