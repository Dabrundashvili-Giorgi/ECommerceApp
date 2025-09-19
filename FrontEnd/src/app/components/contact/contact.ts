import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent {
  name = '';
  email = '';
  phone = '';
  message = '';

  submitForm() {
    console.log('მონაცემები გაიგზავნა:', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      message: this.message
    });
    alert('გმადლობთ, რომ დაგვიკავშირდით!');
  }
}