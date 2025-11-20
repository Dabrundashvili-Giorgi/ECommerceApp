// import { Directive, ElementRef, Input, HostListener } from '@angular/core';
// import { AdminEditService } from '../services/admin-edit.service';
// import { ProductService } from '../services/product.service';

// @Directive({
//   selector: '[editableField]',
//   standalone: true
// })
// export class EditableDirective {
//   @Input('editableField') fieldKey!: string;
//   @Input() contentId!: number;

//   constructor(
//     private el: ElementRef,
//     private editService: AdminEditService,
//     private productService: ProductService
//   ) {}

//   @HostListener('click')
//   onClick() {
//     if (!this.editService.currentState) return;

//     const newValue = prompt('შეიყვანე ახალი მნიშვნელობა:', this.el.nativeElement.innerText);
//     if (newValue !== null) {
//       this.el.nativeElement.innerText = newValue;

//       // აქ ხდება backend-ზე განახლება
//       this.productService.updateProduct(this.contentId, { [this.fieldKey]: newValue }).subscribe();
//     }
//   }
// }
