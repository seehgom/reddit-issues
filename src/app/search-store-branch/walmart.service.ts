import { Injectable, NgZone, signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { isNil, map } from 'lodash-es';
import { asyncScheduler } from 'rxjs';

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
    const val$ = signal<T | null>(null);
    asyncScheduler.schedule(() => val$.set(val), delayMs);
    return val$;
  }

  getAllStates() {
    return this.delayed$(
      map(Array(STATE_COUNT), () => faker.location.state()),
      2000,
    );
  }

  getStoreList(state: string | null) {
    if (isNil(state)) return signal(null);
    return this.delayed$(
      map(
        Array(STORE_COUNT),
        () => `Walmart Store #${faker.location.buildingNumber()}`,
      ),
      2000,
    );
  }

  getDepartments(storeName: string | null) {
    if (isNil(storeName)) return signal(null);
    return this.delayed$(
      map(Array(Math.floor(Math.random() * 5) + 5), () =>
        faker.commerce.department(),
      ),
      2000,
    );
  }

  getProducts(department: string | null) {
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
