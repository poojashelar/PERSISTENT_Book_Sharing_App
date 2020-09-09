import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as bookActions from '../state/book.actions';

import * as fromBook from '../state/book.reducer';
import { AppState, selectAuthState } from '../../store/app.states';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
books$: Observable<Book[]>;
error$: Observable<string>;
getState: Observable<any>;
isAuthenticated = false;

  constructor(private store: Store<fromBook.AppState>, private userStore: Store<AppState>) {
    this.getState = this.userStore.select(selectAuthState);
  }

  ngOnInit(): void {
    this.store.dispatch(bookActions.loadBooks());
    this.books$ = this.store.pipe(select(fromBook.getBooks));
    this.error$ = this.store.pipe(select(fromBook.getError));
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  deleteBook(book: Book): void {
    if (confirm('Are You Sure You want to Delete the Book?')) {
      const id  = book.id;
      this.store.dispatch(bookActions.deleteBook({id}));
    }
  }

  editBook(book: Book): void {
    const payload  = book.id;
    this.store.dispatch(bookActions.loadBook({payload}));
  }

}
