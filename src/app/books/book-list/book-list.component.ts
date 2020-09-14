import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as bookActions from '../../store/actions/book.actions';

import { AppState, selectAuthState } from '../../state/app.states';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, AfterViewInit {
books: [];
error$: Observable<string>;
getState: Observable<any>;
isAuthenticated = false;

  constructor( private store: Store<AppState>, private router: Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.store.dispatch(bookActions.loadBooks());
    this.store.subscribe(data => {
     this.books = data.book.books;
    });
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
    const checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  ngAfterViewInit(): void {
    const checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  deleteBook(book: Book): void {
    if (confirm('Are you sure you want to Delete the Book?')) {
      const id  = book.id;
      this.store.dispatch(bookActions.deleteBook({id}));
      this.store.dispatch(bookActions.loadBooks());
      this.store.subscribe(data => {
        this.books = data.book.books;
       });
    }
  }
  addBook(): void {
    this.router.navigate(['/book-form']);
  }
  editBook(book: Book): void {
    const payload  = book.id;
    this.router.navigate(['/book-form', {id: payload}]);
  }

}
