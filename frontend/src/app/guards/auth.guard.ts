import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';

import { filter, map, take } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

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
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      take(1) // Complete after the first emission
    );
  }
}
