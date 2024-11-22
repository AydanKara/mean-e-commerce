import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data, {
      withCredentials: true,
    });
  }

  register(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data, {
      withCredentials: true,
    });
  }
}
