import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, selectAuthState } from '../../state/app.states';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated = false;
  constructor( private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }

}
