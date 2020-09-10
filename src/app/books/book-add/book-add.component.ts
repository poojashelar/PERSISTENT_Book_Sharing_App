import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, State, select } from '@ngrx/store';
import * as bookActions from '../state/book.actions';
import * as fromBook from '../state/book.reducer';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  bookForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  createBook(): void {
    const payload: Book = {
      name: this.bookForm.get('name').value,
      description: this.bookForm.get('description').value,
      category: this.bookForm.get('category').value
    };

    this.store.dispatch(bookActions.createBook({payload}));
    this.bookForm.reset();
  }
}

