import { Injectable, NgZone } from '@angular/core';
import { faker } from '@faker-js/faker';
import { isNil, map } from 'lodash-es';
import { asyncScheduler, Subject } from 'rxjs';

export const STATE_COUNT = 4;
export const STORE_COUNT = 4;

export interface Product {
  name: string;
  price: string;
  description: string;
  isbn: string;
}

@Injectable({
  providedIn: 'root',
})
export class WalmartService {
  constructor(private ngZone: NgZone) {}
  delayed$<T>(val: T, delayMs: number) {
    const val$ = new Subject<T>();
    asyncScheduler.schedule(() => val$.next(val), delayMs);
    return val$.asObservable();
  }

  getAllStates() {
    return this.delayed$(
      map(Array(STATE_COUNT), () => faker.location.state()),
      2000,
    );
  }

  getStoreList(state: string | null) {
    if (isNil(state)) throw new Error('no state selected');
    return this.delayed$(
      map(
        Array(STORE_COUNT),
        () => `Walmart Store #${faker.location.buildingNumber()}`,
      ),
      2000,
    );
  }

  getDepartments(storeName: string | null) {
    if (isNil(storeName)) throw new Error('no store selected');
    return this.delayed$(
      map(Array(Math.floor(Math.random() * 5) + 5), () =>
        faker.commerce.department(),
      ),
      2000,
    );
  }

  getProducts(department: string | null) {
    if (!isNil(department)) throw new Error('no department selected');
    return this.delayed$(
      map(
        Array(Math.floor(Math.random() * 5) + 5),
        () =>
          ({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            isbn: faker.commerce.isbn(),
          }) as Product,
      ),
      1000,
    );
  }
}
