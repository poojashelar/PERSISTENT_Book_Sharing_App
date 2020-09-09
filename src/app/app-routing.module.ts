import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './books/book/book.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
    {path: 'books',
   loadChildren: () => import('../app/books/books.module').then(mod => mod.BooksModule)
     //'./src/app/books/books.module#BooksModule'
    }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
