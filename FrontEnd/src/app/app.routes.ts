import { Routes } from '@angular/router';
import { authGuard } from '../app/auth.guard';
import { OurChefsComponent } from './ourchefs/ourchefs';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart').then(m => m.CartComponent)
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadComponent: () => import('./components/product-list/product-list').then(m => m.ProductListComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./components/about-us/about-us').then(m => m.AboutUsComponent)
  },
  {
    path: 'chefs',
    component: OurChefsComponent
  },
  {
  path: '',
  redirectTo: 'products',
  pathMatch: 'full'
}
];