import { Component, effect, OnInit, signal } from '@angular/core';
import { Product, WalmartService } from './walmart.service';
import { get, isEmpty } from 'lodash-es';

@Component({
  selector: 'app-search-store-branch',
  templateUrl: './search-store-branch.component.html',
  styleUrls: ['./search-store-branch.component.scss'],
})
export class SearchStoreBranchComponent implements OnInit {
  usStates$ = signal<string[]>([]);
  selectedUSState$ = signal<string | null>(null);
  storesInSelectedState$ = signal<string[]>([]);
  selectedStore$ = signal<string | null>(null);
  departmentsInStore$ = signal<string[]>([]);
  selectedDepartment$ = signal<string | null>(null);
  products$ = signal<Product[]>([]);
  selectedProduct = signal<Product | null>(null);

  orderOfCleanup = [
    'states',
    'storesInSelectedState',
    'selectedState',
    'selectedStore',
    'departmentsInStore',
    'selectedDepartment',
    'products',
    'selectedProduct',
  ];

  constructor(private walmartService: WalmartService) {
    this.walmartService.getAllStates().subscribe({
      next: (val) => this.usStates$.set(val),
    });
    effect(() => {
      const selectedState = this.selectedUSState$();
      if (!isEmpty(selectedState)) {
        this.walmartService.getStoreList(selectedState).subscribe({
          next: (val) => this.storesInSelectedState$.set(val),
        });
      } else {
        this.storesInSelectedState$.set([]);
      }
    });
    effect(() => {
      const selectedStoreName = this.selectedStore$();
      if (!isEmpty(selectedStoreName)) {
        this.walmartService.getDepartments(selectedStoreName).subscribe({
          next: (val) => this.departmentsInStore$.set(val),
        });
      } else {
        this.departmentsInStore$.set([]);
      }
    });
    effect(() => {
      const selectedDepartment = this.selectedDepartment$();
      if (!isEmpty(selectedDepartment)) {
        this.walmartService.getProducts(selectedDepartment).subscribe({
          next: (val) => this.products$.set(val),
        });
      } else {
        this.products$.set([]);
      }
    });
  }

  ngOnInit(): void {}

  getSelectionData($event: Event): string {
    debugger;
    return get($event, ['target', 'value']);
  }

  stateChanged(value: string) {
    debugger;
    this.selectedUSState$.set(value);
  }
}
