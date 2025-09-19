import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    // ეს მასივი ცარიელი უნდა იყოს
  ],
  imports: [
    BrowserModule,
    
    // აქ არ უნდა იყოს HeaderComponent ან FooterComponent
  ],
  exports: [
    // ეს მასივიც ცარიელი უნდა იყოს
  ]
})
export class AppModule { }