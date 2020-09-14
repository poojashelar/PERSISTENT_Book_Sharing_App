import * as bookActions from '../actions/book.actions';
import { Book } from '../../models/book.model';
import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State {
    books: Book[];
    selectedBookId: number | null;
     loading: boolean;
     loaded: boolean;
     error: string;
}

export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();
export const initialState = bookAdapter.getInitialState({
    books: [],
    loaded: false,
    selectedBookId: null,
    loading: false,
    error: ''
});

export const bookReducer = createReducer (
    initialState,
   on (bookActions.loadBooksSuccess, (state, { books }) => {
     return bookAdapter.addAll( books, {
        ...state,
        loading: false,
        loaded: true,
        books
   }); }),

   on (bookActions.loadBooksFail, (state, { error }) => {
    return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error
    }; }),

    on (bookActions.loadBookSuccess, (state, {book}) => {
        return bookAdapter.addOne(book, {
                            ...state,
                            selectedBookId: book.id
        });
    }),

    on (bookActions.loadBookFail, (state, { error}) => {
        return {
                ...state,
                error
             };
    }),

    on (bookActions.createBookSuccess, (state, {newbook}) => {
        return bookAdapter.addOne(newbook, state);
    }),

    on (bookActions.createBookFail, (state, { error}) => {
        return { ...state, error };
    }),

    on (bookActions.updateBookSuccess, (state, {book}) => {
        return bookAdapter.updateOne(book, state);
    }),

     on (bookActions.updateBookFail, (state, { error}) => {
        return { ...state, error };
    }),

    on (bookActions.deleteBookSuccess, (state, {id}) => {
        return bookAdapter.removeOne(id, state);
    }),

    on (bookActions.deleteBookFail, (state, { error}) => {
        return { ...state, error };
    })
);
