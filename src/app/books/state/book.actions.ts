import { createAction, props, Action } from '@ngrx/store';
import { Book } from '../book.model';
import { Update } from '@ngrx/entity';


export enum BookActionType {
    LOAD_BOOKS = '[Book] Load books',
    LOAD_BOOKS_SUCCESS = '[Book] Load books success',
    LOAD_BOOKS_FAIL = '[Book] Load books fail',
    LOAD_BOOK = '[Book] Load book',
    LOAD_BOOK_SUCCESS = '[Book] Load book success',
    LOAD_BOOK_FAIL = '[Book] Load book fail',
    CREATE_BOOK = '[Book] Create book',
    CREATE_BOOK_SUCCESS = '[Book] Create book success',
    CREATE_BOOK_FAIL = '[Book] Create book fail',
    UPDATE_BOOK = '[Book] Update book',
    UPDATE_BOOK_SUCCESS = '[Book] Update book success',
    UPDATE_BOOK_FAIL = '[Book] Update book fail',
    DELETE_BOOK = '[Book] Delete book',
    DELETE_BOOK_SUCCESS = '[Book] Delete book success',
    DELETE_BOOK_FAIL = '[Book] Delete book fail'
}
export const loadBooks =  createAction(
    '[Book] Load books'
);

export const loadBooksSuccess = createAction(
    '[Book] Load books success',
    props<{books: Book[]}>()

);

export const loadBooksFail = createAction(
    '[Book] Load books fail',
    props<{error: any}>()
);

export const loadBook = createAction(
    '[Book] Load book',
    props<{ payload: number}>()
);


export const loadBookSuccess  = createAction(
    '[Book] Load book success',
    props<{ book: Book}>()

);


export const loadBookFail  = createAction(
    '[Book] Load book fail',
    props<{ error: string}>()
 );


export const createBook = createAction(
    '[Book] Create book',
    props<{ payload: Book}>()

);

export const createBookSuccess  = createAction(
    '[Book] Create book success',
     props<{ newbook: Book}>()
);

export const createBookFail = createAction(
    '[Book] Create book fail',
    props<{ error: string}>()
);
export const updateBook = createAction(
    '[Book] Update book',
    props<{ book: Book}>()
);
export const updateBookSuccess = createAction(
    '[Book] Update book success',
    props<{ book: Update<Book>}>()
);
export const updateBookFail = createAction(
    '[Book] Update book fail',
    props<{ error: string}>()
);

export const deleteBook = createAction(
    '[Book] Delete book',
    props<{ id: number}>()

);

export const deleteBookSuccess = createAction(
    '[Book] Delete book success',
    props<{ id: number}>()
);

export const deleteBookFail = createAction(
    '[Book] Delete book fail',
    props<{ error: string}>()
);
