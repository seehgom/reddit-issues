import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Buyer } from '../buyer';
import { HttpClient } from '@angular/common/http';
import { set } from 'lodash-es';

const url = 'https://65a806b594c2c5762da8280e.mockapi.io/post'
@Component({
  selector: 'app-dynamically',
  templateUrl: './dynamically-loaded-list.component.html',
  styleUrls: ['./dynamically-loaded-list.component.scss'],
})
export class DynamicallyLoadedListComponent implements OnInit{
  buyersList$: Observable<Buyer[]> | null = null;
  cart: { [key: string]: number } = {};
  focusId: string | undefined;

  constructor( private http: HttpClient ) {}

  ngOnInit(): void {
    this.buyersList$ = this.http.get<Buyer[]>(url).pipe(tap(( posts ) => this.focusId = posts[0].id));
  }

  addToCart( row: Buyer ) {
    set(this.cart, row.id, this.howManyInCart(row) + 1);
  }

  removeFromCart( row: Buyer ) {
    set(this.cart, row.id, this.howManyInCart(row) - 1);
  }

  howManyInCart( row: Buyer ) {
    return this.cart[row.id] ?? 0;
  }

  isPresentInCart( row: Buyer ) {
    return this.howManyInCart(row) > 0;
  }

  totalItemsInCart() {
    return Object.values<number>(this.cart).reduce(( sum, val ) => sum + (val ?? 0), 0);
  }
}
