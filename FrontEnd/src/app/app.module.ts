import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // ეს მასივი ცარიელი უნდა იყოს
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // აქ არ უნდა იყოს HeaderComponent ან FooterComponent
  ],
  exports: [
    // ეს მასივიც ცარიელი უნდა იყოს
  ]
})
export class AppModule { }