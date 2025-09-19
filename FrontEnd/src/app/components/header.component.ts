// header.component.ts
import { Component } from '@angular/core';
import { CartService } from '../components/cart/cart.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.css'],
  imports: [RouterModule, CommonModule]
})
export class HeaderComponent {
  CartCount: number = 0;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.cart$.subscribe(items => {
      this.CartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }


goToCart(): void {
  if (this.isLoggedIn()) {
    this.router.navigate(['/cart']);
  } else {
    this.router.navigate(['/login']);
  }
}

goHome(): void {
  this.router.navigate(['/products']);
}

  navigateTo(path: string): void {
    this.router.navigateByUrl(path).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}