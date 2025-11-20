import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { AdminChefsComponent } from '../admin-chefs/admin-chefs.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, AdminProductsComponent, AdminChefsComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  activeTab: 'products' | 'chefs' = 'products';
}
