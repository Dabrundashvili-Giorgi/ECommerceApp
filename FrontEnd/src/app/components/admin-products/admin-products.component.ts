import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Product {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  imageUrl?: string;
  isAvailable?: boolean;
  isVegetarian?: boolean;
  weight?: string;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
  
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = this.resetProduct();
  editingProduct: Product | null = null;

  private apiUrl = 'http://localhost:5294/api/Product';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  resetProduct(): Product {
    return {
      name: '',
      description: '',
      category: '',
      price: 0,
      imageUrl: '',
      isAvailable: true,
      isVegetarian: false,
      weight: ''
    };
  }

  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('❌ ვერ ჩაიტვირთა პროდუქტები', err)
    });
  }

  saveProduct(): void {
    const headers = this.getAuthHeaders();

    if (this.editingProduct) {
      //  განახლება
      this.http.put(`${this.apiUrl}/${this.editingProduct.id}`, this.newProduct, { headers }).subscribe({
        next: () => {
          console.log('✅ პროდუქტი განახლდა');
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => console.error('❌ განახლების შეცდომა', err)
      });
    } else {
      //  დამატება
      this.http.post(this.apiUrl, this.newProduct, { headers }).subscribe({
        next: () => {
          console.log('✅ პროდუქტი დაემატა');
          this.loadProducts();
          this.newProduct = this.resetProduct();
        },
        error: (err) => console.error('❌ დამატების შეცდომა', err)
      });
    }
  }

  editProduct(p: Product): void {
    this.editingProduct = p;
    this.newProduct = { ...p };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.newProduct = this.resetProduct();
  }

  deleteProduct(id: number): void {
    if (!confirm('ნამდვილად გსურთ წაშლა?')) return;

    const headers = this.getAuthHeaders();

    this.http.delete(`${this.apiUrl}/${id}`, { headers }).subscribe({
      next: () => {
        console.log('✅ პროდუქტი წაიშალა');
        this.loadProducts();
      },
      error: (err) => console.error('❌ წაშლის შეცდომა', err)
    });
  }
}




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// interface Product {
//   id?: number;
//   name: string;
//   description?: string;
//   category?: string;
//   price?: number;
//   imageUrl?: string;
//   isAvailable?: boolean;
//   isVegetarian?: boolean;
//   weight?: string;
// }

// @Component({
//   selector: 'app-admin-products',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './admin-products.component.html',
//   styleUrls: ['./admin-products.component.css']
// })
// export class AdminProductsComponent implements OnInit {
//   products: Product[] = [];
//   newProduct: Product = this.resetProduct();
//   editingProduct: Product | null = null;

//   private apiUrl = 'http://localhost:5294/api/Product';

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {
//     this.loadProducts();
//   }

//   resetProduct(): Product {
//     return {
//       name: '',
//       description: '',
//       category: '',
//       price: 0,
//       imageUrl: '',
//       isAvailable: true,
//       isVegetarian: false,
//       weight: ''
//     };
//   }

//   loadProducts(): void {
//     this.http.get<Product[]>(this.apiUrl).subscribe({
//       next: (data) => this.products = data,
//       error: (err) => console.error('❌ ვერ ჩაიტვირთა პროდუქტები', err)
//     });
//   }

//   saveProduct(): void {
//     if (this.editingProduct) {
//       // Update
//       this.http.put(`${this.apiUrl}/${this.editingProduct.id}`, this.newProduct).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.cancelEdit();
//         },
//         error: (err) => console.error('❌ განახლების შეცდომა', err)
//       });
//     } else {
//       // Add
//       this.http.post(this.apiUrl, this.newProduct).subscribe({
//         next: () => {
//           this.loadProducts();
//           this.newProduct = this.resetProduct();
//         },
//         error: (err) => console.error('❌ დამატების შეცდომა', err)
//       });
//     }
//   }

//   editProduct(p: Product): void {
//     this.editingProduct = p;
//     this.newProduct = { ...p };
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }

//   cancelEdit(): void {
//     this.editingProduct = null;
//     this.newProduct = this.resetProduct();
//   }

//   deleteProduct(id: number): void {
//     if (confirm('ნამდვილად გსურთ წაშლა?')) {
//       this.http.delete(`${this.apiUrl}/${id}`).subscribe({
//         next: () => this.loadProducts(),
//         error: (err) => console.error('❌ წაშლის შეცდომა', err)
//       });
//     }
//   }
// }
