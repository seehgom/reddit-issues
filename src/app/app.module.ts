import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { A11yModule } from '@angular/cdk/a11y';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FocusDirective } from './focus.directive';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule, A11yModule, BrowserAnimationsModule, HttpClientModule, NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
