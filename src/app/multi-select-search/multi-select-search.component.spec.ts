import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectSearchComponent } from './multi-select-search.component';

describe('MatSelectSearchComponent', () => {
  let component: MultiSelectSearchComponent;
  let fixture: ComponentFixture<MultiSelectSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiSelectSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
