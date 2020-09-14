import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookComponent } from './books/book/book.component';
import { BookFormComponent } from './books/book-form/book-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch:'full'},
  {path: 'books', component: BookComponent },
  {path: 'book-form', component: BookFormComponent, pathMatch: 'full'},
  // {path: 'book-form/:bookId', component: BookFormComponent}
  //  loadChildren: () => import('../app/books/books.module').then(mod => mod.BooksModule)
  //    //'./src/app/books/books.module#BooksModule'
  //   }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
