import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Chef {
  id?: number;
  name: string;
  specialty: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-admin-chefs',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-chefs.component.html',
  styleUrls: ['./admin-chefs.component.css']
})
export class AdminChefsComponent implements OnInit {
  chefs: Chef[] = [];
  newChef: Chef = this.resetChef();
  editingChef: Chef | null = null;

  private apiUrl = 'http://localhost:5294/api/Chef';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadChefs();
  }
  resetChef(): Chef {
    return {
      name: '',
      specialty: '',
      imageUrl: '',
      description: ''
    };
  }

  loadChefs(): void {
    this.http.get<Chef[]>(this.apiUrl).subscribe({
      next: (data) => (this.chefs = data),
      error: (err) => console.error('❌ შეფების წამოღება ვერ მოხერხდა:', err)
    });
  }

  saveChef(): void {
    if (!this.newChef.name.trim() || !this.newChef.specialty.trim()) return;
 // შეფის რედაქტირება
    if (this.editingChef) {
      this.http.put(`${this.apiUrl}/${this.editingChef.id}`, this.newChef).subscribe({
        next: () => {
          this.loadChefs();
          this.newChef = this.resetChef();
          this.editingChef = null;
        },
        error: (err) => console.error('❌ განახლების შეცდომა:', err)
      });
    } else {
      // ახალი შეფი
      this.http.post(this.apiUrl, this.newChef).subscribe({
        next: () => {
          this.loadChefs();
          this.newChef = this.resetChef();
        },
        error: (err) => console.error('❌ დამატების შეცდომა:', err)
      });
    }
  }

  editChef(chef: Chef): void {
    this.newChef = { ...chef };
    this.editingChef = chef;
  }

  deleteChef(id?: number): void {
    if (!id || !confirm('დარწმუნებული ხართ, რომ გსურთ წაშლა?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => this.loadChefs(),
      error: (err) => console.error('❌ წაშლის შეცდომა:', err)
    });
  }
}
