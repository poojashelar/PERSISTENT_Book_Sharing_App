import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { BookService } from '../../Services/book.service';
import * as bookActions from '../actions/book.actions';
import { Book } from '../../models/book.model';

@Injectable()
export class BookEffect {
  constructor(
    private actions$: Actions,
    private bookService: BookService
  ) { }
  loadBooks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(
        bookActions.loadBooks
      ),
      mergeMap(() =>
        this.bookService.getBooks().pipe(
          map(
            (books: Book[]) =>
              bookActions.loadBooksSuccess({ books })
          ),
          catchError(err => of(bookActions.loadBooksFail(err)))
        )
      )
    )
  );
  loadBook$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBook
      ),
      mergeMap((action) =>
        this.bookService.getBookById(action.payload).pipe(
          map(
            (book: Book) =>
              bookActions.loadBookSuccess({ book })
          ),
          catchError(err => of(bookActions.loadBookFail(err)))
        )
      )
    ));

  createBook$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.createBook
      ),
      map((action) => action.payload),
      mergeMap((book: Book) =>
        this.bookService.createBook(book).pipe(
          map(
            (newbook: Book) =>
              bookActions.createBookSuccess({ newbook })
          ),
          catchError(err => of(bookActions.createBookFail(err)))
        )
      )
    ));

  updateBook$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.updateBook),
      map((action) => action.book),
      mergeMap((book: Book) => this.bookService.updateBook(book).pipe(
        map(
          (updatedbook: Book) =>
            bookActions.updateBookSuccess({
              book: {
                id: updatedbook.id,
                changes: updatedbook
              }
            })
        ),
        catchError(err => of(bookActions.updateBookFail(err)))
      )
      )

    )
  );

  deleteBook$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.deleteBook
      ),
      map((action) => action.id),
      mergeMap((id: number) =>
        this.bookService.deleteBook(id).pipe(
          map(() => bookActions.deleteBookSuccess({ id })
          ),
          catchError(err => of(bookActions.deleteBookFail(err)))
        )
      )
    ),
    { dispatch: false }
  );
}
