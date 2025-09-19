import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

@Component({
  selector: 'app-ourchefs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ourchefs.html',
  styleUrls: ['./ourchefs.css']
})
export class OurChefsComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log("View is ready, initializing Swiper...");
      
const swiper = new Swiper('.ourchefs-swiper', {
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
  }
      });
      console.log("Swiper initialized:", swiper);
    }
  }
}