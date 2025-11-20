import { Component, OnInit } from '@angular/core';
import { CartService } from '../components/cart/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [RouterModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  CartCount: number = 0;
  userRole: string | null = null;

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.CartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  isLoggedIn(): boolean {
    return this.authService.getIsLoggedIn();
  }

  logout(): void {
    this.authService.logout();
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
