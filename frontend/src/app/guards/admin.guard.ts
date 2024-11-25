import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getAuthState().pipe(
      first(), // Take the first emitted value and complete the observable
      map((user) => {
        if (user?.isAdmin) {
          return true;
        }
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
