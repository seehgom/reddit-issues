import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { A11yModule } from '@angular/cdk/a11y';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FocusDirective } from './focus.directive';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DynamicallyLoadedListComponent } from './dynamically/dynamically-loaded-list.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective,
    DynamicallyLoadedListComponent
  ],
  imports: [
    BrowserModule, A11yModule, BrowserAnimationsModule, HttpClientModule, NgOptimizedImage, RouterModule.forRoot([{
      path: 'focus', component: DynamicallyLoadedListComponent
    }, {path:"**", pathMatch: 'full', redirectTo: 'focus'}]), MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
