import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private localStorageKey = 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    const saved = localStorage.getItem(this.localStorageKey);
    return of(saved ? JSON.parse(saved) : []);
  }

  addProduct(product: any): Observable<any> {
    const saved = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    product.id = Date.now();
    saved.push(product);
    localStorage.setItem(this.localStorageKey, JSON.stringify(saved));
    return of(product);
  }

  updateProduct(id: number, updated: any): Observable<any> {
    const saved = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const index = saved.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      saved[index] = updated;
      localStorage.setItem(this.localStorageKey, JSON.stringify(saved));
    }
    return of(updated);
  }

  deleteProduct(id: number): Observable<any> {
    const saved = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    const filtered = saved.filter((p: any) => p.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(filtered));
    return of(true);
  }
}
