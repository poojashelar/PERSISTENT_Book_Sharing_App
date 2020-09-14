import { createFeatureSelector } from '@ngrx/store';

import * as auth from '../store/reducers/auth.reducers';
import * as book from '../store/reducers/book.reducer';

export interface AppState {
  book: any;
  bookState: book.State;
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
  book: book.bookReducer
};


export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectBookState = createFeatureSelector<AppState>('book');

