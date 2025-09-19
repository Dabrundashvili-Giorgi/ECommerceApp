import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  imports: [CommonModule, RouterModule],
})
export class ProductDetail implements OnInit {
  product: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (!productId) {
      console.error('ID არ მოიძებნა');
      this.isLoading = false;
      return;
    }

    this.http.get(`http://localhost:5294/api/Product/${productId}`).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('პროდუქტის მიღების შეცდომა', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('პროდუქტი დაემატა კალათაში!');
    }
  }

  goBack() {
    this.router.navigate(['/products'], {
      queryParams: { reload: Date.now() },
    });
  }
}