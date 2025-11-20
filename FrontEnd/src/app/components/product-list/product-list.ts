
import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart/cart.service';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ProductDetailSectionComponent } from '../product-detail-section/product-detail-section.component';
import { OurChefsComponent } from '../../ourchefs/ourchefs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  weight?: string;
  rating?: number;
  stock?: number;
  createdAt?: string;
  shortDescription?: string;
  originalPrice?: number;
  currentPrice: number;
  discountPercent?: number;
}

interface Popup {
  id: number;
  message: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ProductDetailSectionComponent,
    OurChefsComponent,
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  popups: Popup[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient, 
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Swiper('.product-swiper-container', {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        navigation: {
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        },
      });
    }
  }

loadProducts(): void {
  this.http.get<Product[]>('http://localhost:5294/api/Product').subscribe({
    next: (data) => {
      console.log('📦 მიღებული პროდუქტები:', data);

      // შემთხვევითი პროდუქტი ფასდაკლებით
      const discountedIndex = Math.floor(Math.random() * data.length);

      this.products = data.map((p, index) => {
        const hasDiscount = index === discountedIndex; // მხოლოდ ერთს აქვს ფასდაკლება
        const discount = hasDiscount ? 10 : 0;

        const originalPrice = p.price ?? 0;
        const currentPrice =
          hasDiscount && originalPrice
            ? originalPrice - (originalPrice * discount) / 100
            : originalPrice;

        return {
          id: p.id,
          name: p.name,
          imageUrl: p.imageUrl || 'assets/images/no-image.png',
          shortDescription: p.description || 'გემრიელი კერძი ჩვენი შეფ-მზარეულისგან',
          category: p.category || 'უსახელო',
          isAvailable: p.isAvailable ?? true,
          weight: p.weight || '—',
          isVegetarian: p.isVegetarian ?? false,
          rating: p.rating ?? 5,
          currentPrice,
          originalPrice: hasDiscount ? originalPrice : undefined, // მხოლოდ ფასდაკლებულზე
          discountPercent: discount,
        };
      });
    },
    error: (err) => {
      console.error('❌ პროდუქტის წამოღების შეცდომა:', err);
    },
  });
}

getStarArray(rating?: number): string[] {
  const stars: string[] = [];
  const safeRating = rating ?? 0; // თუ undefined/nullა, ნულად აღიქვამს

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) stars.push('full');
  if (halfStar) stars.push('half');
  for (let i = 0; i < emptyStars; i++) stars.push('empty');

  return stars;
}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.showTemporaryPopup(`"${product.name}" დაემატა კალათაში ✅`);
  }

  addToWishlist(product: Product): void {
    this.showTemporaryPopup(`"${product.name}" დაემატა ფავორიტებში ❤️`);
  }

  showTemporaryPopup(message: string): void {
    const newPopup: Popup = { id: Date.now(), message };
    this.popups.push(newPopup);

    setTimeout(() => {
      const index = this.popups.findIndex((p) => p.id === newPopup.id);
      if (index > -1) this.popups.splice(index, 1);
    }, 2000);
  }

  trackPopupById(index: number, popup: Popup): number {
    return popup.id;
  }
}




      // {
      //   id: 2,
      //   name: 'ქათმის წვნიანი ბრინჯით',
      //   imageUrl: 'assets/images/chicksoup.jpg',
      //   shortDescription: 'ქათამი, ბრინჯი, ხახვი, სტაფილო, ტყემალი.',
      //   category: 'წვნიანი',
      //   isAvailable: true,
      //   weight: '130 გ',
      //   isVegetarian: false,
      //   rating: 4.5,
      //   originalPrice: 8.2,
      //   currentPrice: 7.38,
      //   discountPercent: 10,
      // },
      // {
      //   id: 3,
      //   name: 'ღორის ხორცი და კარტოფილი',
      //   imageUrl: 'assets/images/beeflanguet.jpg',
      //   shortDescription: 'ღორის ხორცი, კარაქი, შავი პილპილი, პომიდორი.',
      //   category: 'ხორციანი კერძი',
      //   isAvailable: true,
      //   weight: '220 გ',
      //   isVegetarian: false,
      //   rating: 4,
      //   currentPrice: 18.5,
      // },
      // {
      //   id: 4,
      //   name: 'პომიდორი მარინადში',
      //   imageUrl: 'assets/images/chickenlanguet.jpg',
      //   shortDescription: 'პომიდორი, კვერცხი, ოხრახუში, კამა.',
      //   category: 'ბოსტნეული',
      //   isAvailable: false,
      //   weight: '140 გ',
      //   isVegetarian: true,
      //   rating: 3,
      //   currentPrice: 12.5,
      // },
      // {
      //   id: 5,
      //   name: 'საქონლის ხორცი',
      //   imageUrl: 'assets/images/seasonalfruits.jpg',
      //   shortDescription: 'წვნიანი საქონლის ხორცი სპეციალური სოუსით.',
      //   category: 'ხორციანი კერძი',
      //   isAvailable: true,
      //   weight: '250 გ',
      //   isVegetarian: false,
      //   rating: 5,
      //   currentPrice: 22.0,
      // },
      // {
      //   id: 6,
      //   name: 'ცხარე ქათმის ფრთები',
      //   imageUrl: 'assets/images/barbecuesalad.jpg',
      //   shortDescription: 'ხრაშუნა ფრთები ცხარე სოუსით.',
      //   category: 'ქათმის კერძი',
      //   isAvailable: false,
      //   weight: '180 გ',
      //   isVegetarian: false,
      //   rating: 4.5,
      //   currentPrice: 15.0,
      // },
      // {
      //   id: 7,
      //   name: 'ბოსტნეულის სალათი',
      //   imageUrl: 'assets/images/noodlesoup.jpg',
      //   shortDescription: 'ახალი ბოსტნეული ზეითუნის ზეთით.',
      //   category: 'სალათი',
      //   isAvailable: true,
      //   weight: '150 გ',
      //   isVegetarian: true,
      //   rating: 5,
      //   currentPrice: 8.0,
      // },
      // {
      //   id: 8,
      //   name: 'გრილზე შემწვარი ბადრიჯანი',
      //   imageUrl: 'assets/images/cheesepancakes.jpg',
      //   shortDescription: 'გრილზე შემწვარი ბადრიჯანი მწვანილებით.',
      //   category: 'წასახემსებელი',
      //   isAvailable: true,
      //   weight: '160 გ',
      //   isVegetarian: true,
      //   rating: 4,
      //   currentPrice: 7.5,
      // },