import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5294/api/Order'; // შეცვალე საჭიროებისამებრ

  constructor(private http: HttpClient) {}

submitOrder(order: any): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post(this.apiUrl, order, { headers });
}
getOrders(): Observable<any[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<any[]>(this.apiUrl, { headers });
}
}
