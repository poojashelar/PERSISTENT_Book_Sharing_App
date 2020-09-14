import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { AppState, selectAuthState } from '../state/app.states';
import { LogIn } from '../store/actions/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    const checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
  }
}
