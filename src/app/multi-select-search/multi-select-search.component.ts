import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import {
  get,
  includes,
  invoke,
  isArray,
  isEmpty,
  isEqual,
  size,
} from 'lodash-es';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Subject,
  tap,
} from 'rxjs';
import { A11yModule } from '@angular/cdk/a11y';

export enum KeyCode {
  Tab = 'Tab',
  Enter = 'Enter',
  Esc = 'Esc',
  Space = 'Space',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Backspace = 'Backspace',
}

const DEBOUNCE_TIME_DURATION = 300;
const keys = [
  KeyCode.Tab,
  KeyCode.Enter,
  KeyCode.Esc,
  // KeyCode.Space,
  KeyCode.ArrowUp,
  KeyCode.ArrowDown,
  KeyCode.Backspace,
];
@Component({
  selector: 'app-mat-select-search',
  templateUrl: './multi-select-search.component.html',
  styleUrls: ['./multi-select-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectSearchComponent),
      multi: true,
    },
  ],
  imports: [
    MatSelectModule,
    MatBadgeModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    NgForOf,
    MatCheckboxModule,
    A11yModule,
    NgIf,
  ],
  standalone: true,
})
export class MultiSelectSearchComponent
  implements ControlValueAccessor, OnInit
{
  @Input() placeholder: string;
  _items = new BehaviorSubject<string[]>([]);
  @Input() set items(items: string[]) {
    if (isEmpty(items)) return;
    this._items.next(items);
    this.toggleAllValue = items;
  }
  get items() {
    return this._items.value;
  }
  filteredItems: string[] = [];
  badgeCount: string | boolean;
  toolTipVal: string;
  @Input() searchPlaceholder: string = 'Search your item...';

  searchTerm = '';
  @Input() isDisabled: boolean = false;
  @Input() dropdownTooltipPosition: TooltipPosition = 'after';

  // eslint-disable-next-line
  @Input()
  _value: string[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};
  toggleAllValue: string[] = [];
  @ViewChild('inputSearch') input: ElementRef;
  searchChanges = new Subject<string>();

  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.setBadgeCount();
    this.onChange(val);
    this.onTouched(val);
    this.cdr.markForCheck();
    // this.setBadgeCount();
    // this.setToolTipValue();
  }

  writeValue(obj: any): void {
    this._value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private _ngZone: NgZone,
  ) {}
  ngOnInit(): void {
    this._items
      .pipe(
        tap(val => console.log(val)),
        debounceTime(DEBOUNCE_TIME_DURATION),
        distinctUntilChanged(isEqual),
      )
      .subscribe(() => {
        this.setFilteredItems();
        this.setBadgeCount();
      });
    this.searchChanges.pipe(debounceTime(DEBOUNCE_TIME_DURATION)).subscribe({
      next: searchText => {
        this.onSearchChange(searchText);
      },
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.setFilteredItems();
    this.markForCheck();
  }

  private setFilteredItems() {
    this.filteredItems = isEmpty(this.searchTerm)
      ? this.items
      : this.items.filter(item =>
          includes(
            item.toLocaleLowerCase(),
            this.searchTerm.toLocaleLowerCase(),
          ),
        );
    this.markForCheck();
  }

  onSelectionChange(event: MatSelectChange): void {
    this.value = isArray(get(event, ['value', 0]))
      ? get(event, ['value', 0])
      : event.value;
    this.onChange(this._value);
    this.onTouched(this._value);
    this.markForCheck();
  }

  setBadgeCount() {
    const sizeToShowOnBadge = size(this.value);
    this.badgeCount =
      sizeToShowOnBadge > 1 ? `${sizeToShowOnBadge} selected` : false;
  }

  toggleAllFn(selected: boolean) {
    this.value = selected ? this.filteredItems : [];
  }

  keyCalled($event: KeyboardEvent) {
    if (!includes(keys, $event.key)) {
      $event.stopPropagation();
      return;
    }
    if ($event.key === KeyCode.Enter) {
      this.selectFocused();
    }
  }
  @HostListener('click', ['$event'])
  selectFocused($event?: FocusEvent) {
    $event?.stopPropagation();
    invoke(this.input, ['nativeElement', 'focus']);
  }

  markForCheck() {
    this._ngZone.run(() => this.cdr.markForCheck());
  }

  isIndeterminate() {
    if (size(this.value) === 0 || size(this.filteredItems) === 0) return false;
    return (
      !isEqual(size(this.value), size(this.filteredItems)) &&
      size(this.value) > 0
    );
  }

  allSelected() {
    if (size(this.value) === 0 || size(this.filteredItems) === 0) return false;
    return isEqual(size(this.value), size(this.filteredItems));
  }
}
