import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

import { filter, map, take } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { SnackbarService } from '../core/services/snackbar.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);
  private location = inject(Location);
  private snackbar = inject(SnackbarService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return combineLatest([
      this.userService.getAuthState(),
      this.userService.getLoadingState(),
    ]).pipe(
      filter(([user, isLoading]) => !isLoading), // Wait until loading completes
      // The filter(([user, isLoading]) => !isLoading) ensures that the guard doesn’t evaluate the authState until loading is complete.

      map(([user]) => {
        if (user) {
          this.snackbar.error('You are already logged in!');
          setTimeout(() => this.navigateBack(), 2000);
          return false;
        } else {
          return true;
        }
      }),
      take(1) // Complete after the first emission
    );
  }

  navigateBack(): void {
    this.location.back();
  }
}
