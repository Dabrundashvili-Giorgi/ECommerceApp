import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';

interface Popup {
  id: number; 
  message: string;
}

@Component({
  selector: 'app-product-detail-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail-section.html',
  styleUrls: ['./product-detail-section.css']
})
export class ProductDetailSectionComponent {
trackPopupById(index: number, popup: Popup): number {
  return popup.id;
}
  @Input() product: any;
  selectedQuantity: number = 1;
  isFavorite = false;

  // *** ძველი კოდი ***
  // showPopup = false;
  // popupMessage = '';
  // popupTimeout: any;

  popups: Popup[] = [];

  constructor(private cartService: CartService) {}

  addToCart() {
    if (!this.product) return;
    const quantity = this.selectedQuantity > 0 ? this.selectedQuantity : 1;
    const itemToAdd = { ...this.product, quantity };
    this.cartService.addToCart(itemToAdd);
    
    this.showTemporaryPopup(`${quantity} x ${this.product.name} დაემატა კალათაში ✅`);
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    this.showTemporaryPopup(this.isFavorite ? '❤️ დაემატა ფავორიტებში!' : '💔 წაიშალა ფავორიტებიდან!');
  }

  updateQuantity(event: any) {
    const val = +event.target.value;
    this.selectedQuantity = val > 0 ? val : 1;
  }

  getTotalPrice(): number {
    return (this.product?.price || 0) * this.selectedQuantity;
  }

  showTemporaryPopup(message: string) {
    // 1. შევქმნით ახალ ფოფაპს უნიკალური ID-ით
    const newPopup: Popup = {
      id: Date.now(), 
      message: message
    };

    this.popups.push(newPopup);

    setTimeout(() => {
      const index = this.popups.findIndex(p => p.id === newPopup.id);
      if (index > -1) {
        this.popups.splice(index, 1);
      }
    }, 2000);
  }
}