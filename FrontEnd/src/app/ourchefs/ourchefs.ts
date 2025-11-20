import { Component, AfterViewInit, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

interface Chef {
  id: number;
  name: string;
  specialty: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

@Component({
  selector: 'app-ourchefs',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ourchefs.html',
  styleUrls: ['./ourchefs.css']
})
export class OurChefsComponent implements OnInit, AfterViewInit {
  chefs: Chef[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadChefs();
  }

  loadChefs(): void {
    this.http.get<Chef[]>('http://localhost:5294/api/Chef').subscribe({
      next: (data) => {
        console.log('👨‍🍳 მიღებული შეფები:', data);
        this.chefs = data;
        setTimeout(() => this.initSwiper(), 100);
      },
      error: (err) => console.error('შეფების წამოღების შეცდომა:', err)
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initSwiper();
    }
  }

  private initSwiper(): void {
    if (isPlatformBrowser(this.platformId)) {
      new Swiper('.ourchefs-swiper', {
        modules: [Navigation],
        spaceBetween: 25,
        slidesPerView: 1,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          640: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
      });
    }
  }
}
