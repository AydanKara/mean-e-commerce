import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;
  // Track authentication state
  private authState = new BehaviorSubject<User | null>(null);
  private loading = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient) {}

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
      .pipe(map((response) => response.user));
  }

  register(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(`${this.apiUrl}/me`, { withCredentials: true })
      .pipe(tap((response) => console.log('Response from /me:', response)));
  }
}
