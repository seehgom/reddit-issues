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
    this.buyersList$ = this.http.get<Buyer[]>(url).pipe(tap(( buyersList ) => this.focusId = buyersList[0].id));
  }

  addToCart( buyer: Buyer ) {
    set(this.cart, buyer.id, this.howManyInCart(buyer) + 1);
  }

  removeFromCart( buyer: Buyer ) {
    set(this.cart, buyer.id, this.howManyInCart(buyer) - 1);
  }

  howManyInCart( buyer: Buyer ) {
    return this.cart[buyer.id] ?? 0;
  }

  isPresentInCart( buyer: Buyer ) {
    return this.howManyInCart(buyer) > 0;
  }

  totalItemsInCart() {
    return Object.values<number>(this.cart).reduce(( sum, val ) => sum + (val ?? 0), 0);
  }
}
