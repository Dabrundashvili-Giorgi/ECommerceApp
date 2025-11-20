import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  showRules = false;

  hasUpper = false;
  hasNumber = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      this.router.navigate(['/products']);
    }
  }

  onPasswordInput() {
    this.hasUpper = /[A-Z]/.test(this.password);
    this.hasNumber = /\d/.test(this.password);
  }

  isPasswordValid(): boolean {
    return this.hasUpper && this.hasNumber && this.password.length >= 4;
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'პაროლები არ ემთხვევა!';
      return;
    }

    if (!this.isPasswordValid()) {
      this.errorMessage = 'პაროლი უნდა შეიცავდეს მინ. ერთ დიდ ასოს და ერთ რიცხვს.';
      return;
    }

    this.authService.register({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }).subscribe({
      next: () => {
        this.successMessage = '🎉 რეგისტრაცია წარმატებით დასრულდა!';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 2500);
      },
error: (err) => {
  const msg = err.error?.message || err.error?.title || err.message;

  if (msg.includes('მომხმარებელი უკვე არსებობს'))
    this.errorMessage = '❌ ასეთი Username უკვე არსებობს.';
  else
    this.errorMessage = '⚠️ რეგისტრაციისას მოხდა შეცდომა.';

  this.successMessage = '';
}
    });
  }
}
