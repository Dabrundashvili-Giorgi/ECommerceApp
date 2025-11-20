import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  step = 1;
  username = '';
  code = '';
  newPassword = '';
  message = '';
  api = 'http://localhost:5294/api/Password';

  canResend = true;
  resendTimer = 0;
  isLoading = false;

  hasUpper = false;
  hasNumber = false;

  constructor(private http: HttpClient) {}

requestCode() {
  if (!this.canResend) return;
  this.isLoading = true;

  this.http.post(`${this.api}/request`, { username: this.username }).subscribe({
    next: (res: any) => {
      this.message = '📩 კოდი გაიგზავნა (შეამოწმე კონსოლი).';
      console.log('📩 პაროლის აღდგენის კოდი (სატესტოდ):', res.code);
      this.step = 2;
      this.startResendTimer(5);
      this.autoClearMessage();
      this.isLoading = false;
    },

    error: (err) => {
      this.isLoading = false;

      if (err.error === "მომხმარებელი ვერ მოიძებნა.") {
        this.message = "❌ ასეთი მომხმარებელი ვერ მოიძებნა.";
      } else {
        this.message = "⚠️ მომხმარებელი ვერ მოიძებნა.";
      }

      this.autoClearMessage();
    }
  });
}

  verifyCode() {
    this.http.post(`${this.api}/verify`, { username: this.username, code: this.code }).subscribe({
      next: () => {
        this.message = '✅ კოდი სწორია.';
        this.step = 3;
        this.autoClearMessage();
      },
      error: () => {
        this.message = '❌ კოდი არასწორია ან ვადაგასულია.';
        this.autoClearMessage();
      }
    });
  }
  resetPassword() {
    if (!this.isPasswordValid()) {
      this.message = '⚠️ პაროლი უნდა შეიცავდეს მინ. ერთ დიდ ასოს, ერთ რიცხვს და მინ. 4 სიმბოლოს.';
      this.autoClearMessage();
      return;
    }

    this.http.post(`${this.api}/reset`, {
      username: this.username,
      code: this.code,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.message = '🔐 პაროლი წარმატებით შეიცვალა! გადადიხართ ავტორიზაციაზე...';
        this.autoClearMessage();
        setTimeout(() => window.location.href = '/login', 3000);
      },
      error: () => {
        this.message = '⚠️ ვერ მოხერხდა პაროლის შეცვლა.';
        this.autoClearMessage();
      }
    });
  }
  private startResendTimer(seconds: number) {
    this.canResend = false;
    this.resendTimer = seconds;
    const timer = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        clearInterval(timer);
        this.canResend = true;
      }
    }, 1000);
  }
  private autoClearMessage() {
    setTimeout(() => (this.message = ''), 4000);
  }

  onPasswordInput() {
    this.hasUpper = /[A-Z]/.test(this.newPassword);
    this.hasNumber = /\d/.test(this.newPassword);
  }

  /** მინიმუმ 4 სიმბოლო, დიდი ასო და რიცხვი */
  isPasswordValid(): boolean {
    return this.hasUpper && this.hasNumber && this.newPassword.length >= 4;
  }
}
