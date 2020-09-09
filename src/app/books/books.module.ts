import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule, Actions } from '@ngrx/effects';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { BookComponent } from './book/book.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BookListComponent } from './book-list/book-list.component';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { bookReducer } from '../books/state/book.reducer';
import { BookEffect } from '../books/state/book.effects';
import { from } from 'rxjs';

const bookRoutes: Routes = [
  {path: '', component: BookComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('books', bookReducer),
    RouterModule.forChild(bookRoutes),
    EffectsModule.forFeature([BookEffect])
  ],
  declarations: [BookComponent, BookAddComponent, BookEditComponent, BookListComponent]
})
export class BooksModule { }
