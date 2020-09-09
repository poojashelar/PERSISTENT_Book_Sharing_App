import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = 'http://localhost:3000/Books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(payload: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${payload}`);
  }

  createBook(payload: Book): Observable<Book> {
    return this.http.post<Book>(this.booksUrl, payload);
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.patch<Book>(
      `${this.booksUrl}/${book.id}`,
      book
    );
  }
  deleteBook(payload: number) {
    return this.http.delete(`${this.booksUrl}/${payload}`);
  }
}
