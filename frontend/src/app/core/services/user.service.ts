import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private userUrl = `${environment.apiUrl}/users`;
  private snackbar = inject(SnackbarService);
  // Track authentication state
  private authState = new BehaviorSubject<User | null>(null);
  private loading = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {
    this.loadUserOnAppInit();
  }

  private loadUserOnAppInit() {
    this.getCurrentUser()
      .pipe(
        catchError(() => {
          return of(null);
        })
      )
      .subscribe((user) => {
        this.setAuthState(user);
        this.setLoadingState(false);
      });
  }

  setLoadingState(isLoading: boolean) {
    this.loading.next(isLoading);
  }

  getLoadingState(): Observable<boolean> {
    return this.loading.asObservable();
  }

  setAuthState(user: User | null) {
    this.authState.next(user);
  }

  getAuthState(): Observable<User | null> {
    return this.authState.asObservable();
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<{ user: User }>(`${this.apiUrl}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.user),
        tap(() => {
          this.getCurrentUser().subscribe((user) => this.setAuthState(user));
        })
      );
  }

  register(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.setAuthState(null)));
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`, { withCredentials: true });
  }

  updateProfile(data: Partial<User>): Observable<User> {
    return this.http
      .patch<User>(`${this.userUrl}/update`, data, { withCredentials: true })
      .pipe(
        tap((updatedUser) => {
          this.setAuthState(updatedUser); // Update auth state after successful update
        }),
        catchError((error) => {
          this.snackbar.error('Error updating profile.');
          throw error;
        })
      );
  }

  getUserId(): string | null {
    const currentUser = this.authState.getValue(); // Get the current value of the BehaviorSubject
    return currentUser?._id || null; // Return the user ID if the user is authenticated, else null
  }
}
