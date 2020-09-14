import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, State, select } from '@ngrx/store';
import * as bookActions from '../../store/actions/book.actions';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../state/app.states';
import { BookService } from '../../Services/book.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, AfterViewInit {
  book$: Observable<Book>;
  bookForm: FormGroup;
  getState: Observable<any>;
  isAuthenticated = false;
  id: number;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private userStore: Store<AppState>,
    public bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getState = this.userStore.select(selectAuthState);
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });

    if (this.id) {
    this.bookService.getBookById(this.id).subscribe(currentBook => {
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

    const checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  ngAfterViewInit(): void {
    const checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  createBook(): void {
    const payload: Book = {
      name: this.bookForm.value.name,
      description: this.bookForm.value.description,
      category: this.bookForm.value.category
    };

    this.store.dispatch(bookActions.createBook({payload}));
    this.bookForm.reset();
    this.store.dispatch(bookActions.loadBooks());
    this.router.navigateByUrl('/books');
  }

  updateBook(): void {
    const book: Book = {
      name: this.bookForm.value.name,
      description: this.bookForm.value.description,
      category: this.bookForm.value.category,
      id: this.id
    };
    this.store.dispatch(bookActions.updateBook({book}));
    this.store.dispatch(bookActions.loadBooks());
    this.router.navigateByUrl('/books');
}

}
