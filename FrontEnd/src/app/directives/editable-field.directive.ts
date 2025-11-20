// import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// import { ProductService } from '../services/product.service';

// @Directive({
//   selector: '[editableField]'
// })
// export class EditableFieldDirective {
//   @Input('editableField') fieldName!: string;
//   @Input() contentId!: number;

//   isEditingEnabled = false;

//   constructor(private el: ElementRef, private productService: ProductService) {}

//   @HostListener('click')
//   onClick() {
//     const currentValue = this.el.nativeElement.innerText;
//     const newValue = prompt('შეიყვანეთ ახალი მნიშვნელობა:', currentValue);

//     if (newValue !== null && newValue !== currentValue) {
//       this.el.nativeElement.innerText = newValue;
//       this.saveChange(newValue);
//     }
//   }

//   saveChange(newValue: any) {
//     if (!this.contentId || !this.fieldName) return;

//     const updateData: any = {};
//     updateData[this.fieldName] = newValue;

//     this.productService.updateProduct(this.contentId, updateData).subscribe({
//       next: () => console.log(`✅ ${this.fieldName} განახლდა წარმატებით`),
//       error: (err) => console.error('❌ შეცდომა განახლებაში:', err)
//     });
//   }
// }
