import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  showDeleteMessage = false;
  deletedProductName: string | null = null;

  constructor(private cartService: CartService) {}

ngOnInit(): void {
  console.log('🧭 CartComponent loaded');
  this.loadCart();
}

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  removeItem(id: number) {
    const product = this.cartItems.find(p => p.id === id);
    if (!product) return;

    this.cartService.removeFromCart(id);
    this.loadCart();
    this.deletedProductName = product.name;
    this.showDeleteMessage = true;

    setTimeout(() => {
      this.showDeleteMessage = false;
      this.deletedProductName = null;
    }, 2000);
  }

  clearCart() {
    this.cartService.clearCart();
    this.loadCart();
    this.deletedProductName = 'ყველა პროდუქტი';
    this.showDeleteMessage = true;

    setTimeout(() => {
      this.showDeleteMessage = false;
      this.deletedProductName = null;
    }, 2000);
  }

getTotalPrice(): number {
  return this.cartItems.reduce((total, item) => {
    const price = item.currentPrice || 0;
    return total + price * (item.quantity || 1);
  }, 0);
}
  getTotalQuantity(): number {
  return this.cartItems.reduce((total, item) => total + item.quantity, 0);
}
}
