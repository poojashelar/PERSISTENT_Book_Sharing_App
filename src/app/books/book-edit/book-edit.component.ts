import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, State, select } from '@ngrx/store';
import * as bookActions from '../state/book.actions';
import * as fromBook from '../state/book.reducer';
import { Book } from '../book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      id: null
    });

    const book$: Observable<Book> = this.store.select(
    fromBook.getCurrentBook
  );

    book$.subscribe(currentBook => {
    if (currentBook) {
      this.bookForm.patchValue({
        name: currentBook.name,
        description: currentBook.description,
        category: currentBook.category,
        id: currentBook.id
      });
    }
  });
}

updateBook(): void {
  const book: Book = {
    name: this.bookForm.get('name').value,
    description: this.bookForm.get('description').value,
    category: this.bookForm.get('category').value,
    id: this.bookForm.get('id').value
  };

  this.store.dispatch(bookActions.updateBook({book}));
}
}
