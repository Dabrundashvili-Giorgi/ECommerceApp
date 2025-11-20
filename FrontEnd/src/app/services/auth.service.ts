import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());

  public isLoggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();
  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  private getStoredRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }

  getIsLoggedIn(): boolean {
    return this.loggedInStatus.getValue();
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const payload = {
      username: credentials.email,
      password: credentials.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/login`, payload).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);

          try {
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            const role =
              payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User';
            localStorage.setItem('role', role);
            this.userRoleSubject.next(role); 
          } catch {
            console.error('❌ როლის ამოღება ვერ მოხერხდა');
          }

          this.loggedInStatus.next(true);
        }
      })
    );
  }

  register(userData: { email: string; password: string; confirmPassword: string }): Observable<any> {
    const payload = {
      username: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword
    };
    return this.http.post(`${this.apiUrl}/Auth/register`, payload);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.loggedInStatus.next(false);
    this.userRoleSubject.next(null); 
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }
}
