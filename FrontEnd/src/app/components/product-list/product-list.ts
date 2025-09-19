import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart/cart.service';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { ProductDetailSectionComponent } from '../product-detail-section/product-detail-section.component';
import { OurChefsComponent } from '../../ourchefs/ourchefs';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  shortDescription?: string;
  category?: string;
  isAvailable?: boolean;
  weight?: string;
  isVegetarian?: boolean;
  rating?: number;
  originalPrice?: number;
  currentPrice: number;
  discountPercent?: number;
}

// ფოფაპის ინტერფეისი
interface Popup {
  id: number;
  message: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductDetailSectionComponent, OurChefsComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  popups: Popup[] = []; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const swiper = new Swiper('.product-swiper-container', {
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
    this.products = [
      {
        id: 1,
        name: 'ბადრიჯანი',
        imageUrl: 'assets/images/medium.jpg',
        shortDescription: 'მარინადში შემწვარი ბადრიჯანი, სპეციალური სოუსი, მწვანილი',
        category: 'წასახემსებელი',
        isAvailable: true,
        weight: '120 გ',
        isVegetarian: true,
        rating: 5,
        currentPrice: 4.5,
      },
      {
        id: 2,
        name: 'ქათმის წვნიანი ბრინჯით',
        imageUrl: 'assets/images/chicksoup.jpg',
        shortDescription: 'ქათამი, ბრინჯი, ხახვი, სტაფილო, ტყემალი.',
        category: 'წვნიანი',
        isAvailable: true,
        weight: '130 გ',
        isVegetarian: false,
        rating: 4.5,
        originalPrice: 8.2,
        currentPrice: 7.38,
        discountPercent: 10,
      },
      {
        id: 3,
        name: 'ღორის ხორცი და კარტოფილი',
        imageUrl: 'assets/images/beeflanguet.jpg',
        shortDescription: 'ღორის ხორცი, კარაქი, შავი პილპილი, პომიდორი.',
        category: 'ხორციანი კერძი',
        isAvailable: true,
        weight: '220 გ',
        isVegetarian: false,
        rating: 4,
        currentPrice: 18.5,
      },
      {
        id: 4,
        name: 'პომიდორი მარინადში',
        imageUrl: 'assets/images/chickenlanguet.jpg',
        shortDescription: 'პომიდორი, კვერცხი, ოხრახუში, კამა.',
        category: 'ბოსტნეული',
        isAvailable: false,
        weight: '140 გ',
        isVegetarian: true,
        rating: 3,
        currentPrice: 12.5,
      },
      {
        id: 5,
        name: 'საქონლის ხორცი',
        imageUrl: 'assets/images/seasonalfruits.jpg',
        shortDescription: 'წვნიანი საქონლის ხორცი სპეციალური სოუსით.',
        category: 'ხორციანი კერძი',
        isAvailable: true,
        weight: '250 გ',
        isVegetarian: false,
        rating: 5,
        currentPrice: 22.0,
      },
      {
        id: 6,
        name: 'ცხარე ქათმის ფრთები',
        imageUrl: 'assets/images/barbecuesalad.jpg',
        shortDescription: 'ხრაშუნა ფრთები ცხარე სოუსით.',
        category: 'ქათმის კერძი',
        isAvailable: false,
        weight: '180 გ',
        isVegetarian: false,
        rating: 4.5,
        currentPrice: 15.0,
      },
      {
        id: 7,
        name: 'ბოსტნეულის სალათი',
        imageUrl: 'assets/images/noodlesoup.jpg',
        shortDescription: 'ახალი ბოსტნეული ზეითუნის ზეთით.',
        category: 'სალათი',
        isAvailable: true,
        weight: '150 გ',
        isVegetarian: true,
        rating: 5,
        currentPrice: 8.0,
      },
      {
        id: 8,
        name: 'გრილზე შემწვარი ბადრიჯანი',
        imageUrl: 'assets/images/cheesepancakes.jpg',
        shortDescription: 'გრილზე შემწვარი ბადრიჯანი მწვანილებით.',
        category: 'წასახემსებელი',
        isAvailable: true,
        weight: '160 გ',
        isVegetarian: true,
        rating: 4,
        currentPrice: 7.5,
      },
    ];
  }

  getStarArray(rating?: number): string[] {
    const stars = [];
    if (rating === undefined) return Array(5).fill('empty');
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
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
    const newPopup: Popup = {
      id: Date.now(),
      message: message,
    };
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
