import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';

const bookRoutes: Routes = [
  {path: '/book-form', component: BookFormComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(bookRoutes),
  ],
  declarations: [BookFormComponent]
})
export class BooksModule { }
