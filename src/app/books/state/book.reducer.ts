import * as bookActions from './book.actions';
import { Book } from '../book.model';
import * as fromRoot from '../../state/app-state';
import { Action } from 'rxjs/internal/scheduler/Action';
import { createFeatureSelector, createSelector, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface BookState extends EntityState<Book> {
   selectedBookId: number | null;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    books: BookState;
}

export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const defaultBook: BookState = {
    ids: [],
    entities: {},
    selectedBookId: null,
    loading: false,
    loaded: false,
    error: ''
};
export const initialState = bookAdapter.getInitialState(defaultBook);

export const bookReducer = createReducer (
    initialState,
   on (bookActions.loadBooksSuccess, (state, { books }) => {
     return bookAdapter.addAll( books, {
        ...state,
        loading: false,
        loaded: true
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

//  ): BookState {
//     switch (action.type) {
//         case bookActions.BookActionType.LOAD_BOOKS_SUCCESS: {
//             return bookAdapter.addAll(action.payload, {
//                 ...state,
//                 loading: false,
//                 loaded: true
//             })
//         }
//         case bookActions.BookActionType.LOAD_BOOKS_FAIL: {
//             return {
//                 ...state,
//                 entities: {},
//                 loading: false,
//                 loaded: false,
//                 error: action.payload
//             }
//         }
//         case bookActions.BookActionType.LOAD_BOOK_SUCCESS: {
//             return bookAdapter.addOne(action.payload, {
//                 ...state,
//                 selectedBookId: action.payload.id
//             })
//         }
//         case bookActions.BookActionType.LOAD_BOOK_FAIL: {
//             return {
//                 ...state,
//                 error: action.payload
//             }
//         }

//         case bookActions.BookActionType.CREATE_BOOK_SUCCESS: {
//             return bookAdapter.addOne(action.payload, state);
//         }
//         case bookActions.BookActionType.CREATE_BOOK_FAIL: {
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         }

//         case bookActions.BookActionType.UPDATE_BOOK_SUCCESS: {
//             return bookAdapter.updateOne(action.payload, state);
//         }
//         case bookActions.BookActionType.UPDATE_BOOK_FAIL: {
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         }

//         case bookActions.BookActionType.DELETE_BOOK_SUCCESS: {
//             return bookAdapter.removeOne(action.payload, state);
//         }
//         case bookActions.BookActionType.DELETE_BOOK_FAIL: {
//             return {
//                 ...state,
//                 error: action.payload
//             };
//         }
//         default: {
//             return state;
//         }
//     }
// }

const getBookFeatureState = createFeatureSelector<BookState>(
    'books'
);

export const getBooks = createSelector(
    getBookFeatureState,
    bookAdapter.getSelectors().selectAll
);

export const getBooksLoading = createSelector(
    getBookFeatureState,
    (state: BookState) => state.loading
);

export const getBooksLoaded = createSelector(
    getBookFeatureState,
    (state: BookState) => state.loaded
);
export const getError = createSelector(
    getBookFeatureState,
    (state: BookState) => state.error
);

export const getCurrentBookId = createSelector (
    getBookFeatureState,
    (state: BookState) => state.selectedBookId
);

export const getCurrentBook = createSelector(
    getBookFeatureState,
    getCurrentBookId,
    state => state.entities[state.selectedBookId]
);
