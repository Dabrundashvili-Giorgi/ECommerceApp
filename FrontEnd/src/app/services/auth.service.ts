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
  private apiUrl = environment.apiUrl; // apiUrl 

  // BehaviorSubject მომხმარებლის ავტორიზაციის სტატუსის შესანახად
  // თავდაპირველად ვამოწმებთ, არის თუ არა ტოკენი localStorage-ში
  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();


  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('token');
  }
  return false; 
}

  // private hasToken(): boolean {
  //   return !!localStorage.getItem('token'); // !! აბრუნებს boolean-ს
  // }

  // --- HeaderComponent-ისთვის საჭირო მეთოდები/property-ები ---
  /**
   */
  // isLoggedInStatus(): Observable<boolean> { // 
  //   return this.loggedInStatus.asObservable();
  // }

  /**
   * აბრუნებს მომხმარებლის ამჟამინდელ ავტორიზაციის სტატუსს (სინქრონულად)
   */
  getIsLoggedIn(): boolean {
    return this.loggedInStatus.getValue();
  }
  // --- აქ მთავრდება HeaderComponent-ისთვის საჭირო მეთოდები ---

login(credentials: { email: string; password: string }): Observable<AuthResponse> {
  const payload = {
    username: credentials.email,
    password: credentials.password
  };

  return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/login`, payload)
    .pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInStatus.next(true);
        }
      })
    );
}
register(userData: { email: string; password: string; confirmPassword: string }): Observable<any> {
  const payload = {
    username: userData.email, // ბექენდი ელოდება username-ს
    password: userData.password,
    confirmPassword: userData.confirmPassword
  };

  console.log("▶ AUTH SERVICE PAYLOAD", payload); 

  return this.http.post(`${this.apiUrl}/Auth/register`, payload);
}
logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
  this.loggedInStatus.next(false);
  this.router.navigate(['/login']);
}
  // logout(): void {
  //   localStorage.removeItem('token');
  //   this.loggedInStatus.next(false); // სტატუსის განახლება
  //   this.router.navigate(['/login']); // გადამისამართება login გვერდზე
  // }
getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
}
