import { createAction, props, Action } from '@ngrx/store';
import { Book } from '../../models/book.model';
import { Update } from '@ngrx/entity';

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
