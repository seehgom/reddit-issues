import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { STATE_COUNT, STORE_COUNT, WalmartService } from './walmart.service';
import { faker } from '@faker-js/faker';

describe('WalmartService', () => {
  let service: WalmartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalmartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAllStates', () => {
    it('get all states', (done) => {
      service.getAllStates().subscribe({
        next: (allStates) => {
          expect(allStates).toEqual(jasmine.any(Array));
          expect(allStates).toHaveSize(STATE_COUNT);
          expect(allStates[0]).toEqual(jasmine.any(String));
          done();
        },
      });
    });
  });
  describe('getStoreList', () => {
    it('get stores in given state', fakeAsync(() => {
      let storeList = null;
      service.getStoreList(faker.location.state()).subscribe({
        next: (val) => {
          storeList = val;
        },
      });
      tick(5000);
      expect(storeList).toEqual(jasmine.any(Array));
      expect(storeList).toHaveSize(STORE_COUNT);
      // @ts-ignore
      expect(storeList[0]).toEqual(jasmine.any(String));
    }));
  });
  describe('getDepartments', () => {
    it('get departments', fakeAsync(() => {
      let departments = null;
      service.getDepartments(faker.string.sample()).subscribe({
        next: (val) => {
          departments = val;
        },
      });
      tick(6000);
      expect(departments).toEqual(jasmine.any(Array));
      // @ts-ignore
      expect(departments.length).toBeGreaterThanOrEqual(5);
      // @ts-ignore
      expect(departments[0]).toEqual(jasmine.any(String));
    }));
  });
  describe('getProducts', () => {
    it('get all products in the department', fakeAsync(() => {
      let products = null;
      service.getProducts(faker.string.sample()).subscribe({
        next: (val) => {
          products = val;
        },
      });
      tick(5000);
      expect(products).toEqual(jasmine.any(Array));
      // @ts-ignore
      expect(products.length).toBeGreaterThanOrEqual(5);
      // @ts-ignore
      expect(products[0]).toEqual({
        name: jasmine.any(String),
        price: jasmine.any(String),
        description: jasmine.any(String),
        isbn: jasmine.any(String),
      });
    }));
  });
});
