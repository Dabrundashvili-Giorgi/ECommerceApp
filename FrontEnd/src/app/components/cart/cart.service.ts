import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.cartItems = this.getCart();
      this.cartSubject.next(this.cartItems);
    }
  }

  getCart(): any[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }

  addToCart(item: any) {
    const index = this.cartItems.findIndex(p => p.id === item.id);
    if (index > -1) {
      this.cartItems[index].quantity += item.quantity || 1;
    } else {
      this.cartItems.push({ ...item, quantity: item.quantity || 1 });
    }
    this.saveCart();
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  private saveCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
    this.cartSubject.next(this.cartItems);
  }
}
