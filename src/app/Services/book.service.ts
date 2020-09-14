import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:3000/Books';

  constructor(private http: HttpClient) {}

  // Make api call to load all books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

   // Make api call to get book by id
  getBookById(payload: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${payload}`);
  }

  // Make api call to add new book
  createBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, payload);
  }

  // Make api call to update book
  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(
      `${this.booksUrl}/${book.id}`,
      book
    );
  }

  // Make api call to delete book
  deleteBook(payload: number) {
    return this.http.delete(`${this.booksUrl}/${payload}`);
  }
}
