import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  private loadingSource = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSource.asObservable()
  busyRequestCount = 0;

  busy() {
    this.busyRequestCount++;
    this.setLoading(true);
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.setLoading(false)
    }
  }

  private setLoading(value: boolean) {
    this.loadingSource.next(value); // Emit the new value
  }
}
