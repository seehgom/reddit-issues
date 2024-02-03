import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { SearchStoreBranchComponent } from './search-store-branch.component';
import { Product, WalmartService } from './walmart.service';
import { of } from 'rxjs';
import { faker } from '@faker-js/faker';

describe('SearchStoreBranchComponent', () => {
  let component: SearchStoreBranchComponent;
  let fixture: ComponentFixture<SearchStoreBranchComponent>;
  let walmartService: WalmartService;
  const stateList = ['California', 'Texas', 'New York'];
  const storeList = ['Store 1', 'Store 2', 'Store 3'];
  const departmentsList = ['Electronics', 'Toys', 'Groceries'];

  const productList: Product[] = Array(4).map(() => ({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    isbn: faker.commerce.isbn(),
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchStoreBranchComponent],
    }).compileComponents();
    walmartService = TestBed.inject(WalmartService);
    spyOn(walmartService, 'getAllStates').and.returnValue(of(stateList));
    spyOn(walmartService, 'getStoreList').and.returnValue(of(storeList));
    spyOn(walmartService, 'getDepartments').and.returnValue(
      of(departmentsList),
    );
    spyOn(walmartService, 'getProducts').and.returnValue(of(productList));
    fixture = TestBed.createComponent(SearchStoreBranchComponent);
    component = fixture.componentInstance;
    component.usStates$; //?
    fixture.detectChanges();
    component.usStates$; //?
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('states are retrieved', () => {
    expect(walmartService.getAllStates).toHaveBeenCalledTimes(1);
    expect(component.usStates$).toEqual(stateList);
  });
  it('onStateChange', fakeAsync(() => {
    component.onStateChange($event);
    expect(component.selectedUSState$).toEqual(stateList[0]);
    expect(walmartService.getStoreList).toHaveBeenCalledTimes(1);
    tick(5000);
    expect(component.storesInSelectedState$).toEqual(storeList);
  }));
  it('onStoreChange', fakeAsync(() => {
    component.onStoreChange({
      target: { value: storeList[0] },
    } as any as Event);
    expect(component.selectedStore$).toEqual(storeList[0]);
    expect(walmartService.getDepartments).toHaveBeenCalledTimes(1);
    tick(5000);
    expect(component.departmentsInStore$).toEqual(departmentsList);
  }));
  //
  // it('onDepartmentChange', () => {
  //   component.onDepartmentChange({
  //     target: { value: departmentsList[0] },
  //   } as any as Event);
  // });
  //
  // it('products are retrieved', () => {
  //   expect(walmartService.getProducts).toHaveBeenCalledTimes(1);
  //   expect(component.products).toEqual(productList);
  // });
});
