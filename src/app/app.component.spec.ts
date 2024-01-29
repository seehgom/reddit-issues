import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { A11yModule } from '@angular/cdk/a11y';
import { FocusDirective } from './focus.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicallyLoadedListComponent } from './dynamically/dynamically-loaded-list.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, FocusDirective, DynamicallyLoadedListComponent],
      imports:[HttpClientTestingModule,A11yModule,MatTabsModule, RouterModule.forRoot([])]
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

});
