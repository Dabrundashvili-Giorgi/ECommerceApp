import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // აქ არის დამატებული ngOnInit -- გადამისამართებისთვის თუ ტოკენი უკვე არსებობს
  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'პაროლები არ ემთხვევა!';
      return;
    }

    this.authService.register({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: () => {
        this.successMessage = 'რეგისტრაცია წარმატებით დასრულდა!';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error?.message || err.error?.title || err.message || 'რეგისტრაციისას მოხდა შეცდომა.';
        this.successMessage = '';
        console.error('რეგისტრაციის შეცდომა:', err);
      }
    });
  }
}
