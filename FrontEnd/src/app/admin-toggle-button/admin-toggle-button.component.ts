import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEditService } from '../services/admin-edit.service';

@Component({
  selector: 'app-admin-toggle-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="edit-toggle-btn" (click)="toggleEdit()">
      {{ editService.currentState ? '🔒 გამორთე რედაქტირება' : '✏️ ჩართე რედაქტირება' }}
    </button>
  `,
  styles: [`
    .edit-toggle-btn {
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 9999;
      background-color: #e74c3c;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      transition: 0.2s;
    }
    .edit-toggle-btn:hover {
      background-color: #c0392b;
      transform: scale(1.05);
    }
  `]
})
export class AdminToggleButtonComponent {
  constructor(public editService: AdminEditService) {}
  toggleEdit() {
    this.editService.toggleEditMode();
  }
}
