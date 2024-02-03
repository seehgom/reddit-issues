import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Product, WalmartService } from './walmart.service';
import { get } from 'lodash-es';

@Component({
  selector: 'app-search-store-branch',
  templateUrl: './search-store-branch.component.html',
  styleUrls: ['./search-store-branch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchStoreBranchComponent implements OnInit {
  usStates$: WritableSignal<string[] | null> =
    this.walmartService.getAllStates();
  selectedUSState$: WritableSignal<string | null> = signal<string | null>(null);
  storesInSelectedState$: Signal<string[] | null> = signal<string[] | null>(
    null,
  );
  selectedStore$: WritableSignal<string | null> = signal<string | null>(null);
  departmentsInStore$ = signal<string[] | null>(null);
  selectedDepartment$: WritableSignal<string | null> = signal<string | null>(
    null,
  );
  products$ = signal<Product[] | null>(null);
  selectedProduct: WritableSignal<Product | null> = signal<Product | null>(
    null,
  );

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
    effect(() => {
      const selectedState = this.selectedUSState$();
      this.storesInSelectedState$ = selectedState
        ? this.walmartService.getStoreList(selectedState)
        : signal(null);
    });
    effect(() => {
      const selectedStoreName = this.selectedStore$();
      this.departmentsInStore$ = selectedStoreName
        ? this.walmartService.getDepartments(selectedStoreName)
        : signal(null);
    });
    effect(() => {
      const selectedDepartment = this.selectedDepartment$();
      this.products$ = selectedDepartment
        ? this.walmartService.getProducts(selectedDepartment)
        : signal(null);
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
