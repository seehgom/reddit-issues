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
import { SearchStoreBranchComponent } from './search-store-branch/search-store-branch.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FocusDirective,
    DynamicallyLoadedListComponent,
    SearchStoreBranchComponent,
  ],
  imports: [
    BrowserModule,
    A11yModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgOptimizedImage,
    RouterModule.forRoot([
      {
        path: 'focus',
        component: DynamicallyLoadedListComponent,
      },
      {
        path: 'wait-and-focus',
        component: SearchStoreBranchComponent,
      },
      { path: '**', pathMatch: 'full', redirectTo: 'focus' },
    ]),
    MatTabsModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
