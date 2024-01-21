import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Post } from './post';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { set } from 'lodash-es';

export const url = 'https://65a806b594c2c5762da8280e.mockapi.io/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  rows$: Observable<Post[]> | null = null;
  cart: { [key: string]: number } = {};
  focusId: string | undefined;

  constructor( private http: HttpClient ) {}

  ngOnInit(): void {
    this.rows$ = this.http.get<Post[]>(url).pipe(tap(( posts ) => this.focusId = posts[0].id));
  }

  addToCart( row: Post ) {
    set(this.cart, row.id, this.howManyInCart(row) + 1);
  }

  removeFromCart( row: Post ) {
    set(this.cart, row.id, this.howManyInCart(row) - 1);
  }

  howManyInCart( row: Post ) {
    return this.cart[row.id] ?? 0;
  }

  isPresentInCart( row: Post ) {
    return this.howManyInCart(row) > 0;
  }

  totalItemsInCart() {
    return Object.values<number>(this.cart).reduce(( sum, val ) => sum + (val ?? 0), 0);
  }
}
