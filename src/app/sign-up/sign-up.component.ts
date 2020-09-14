import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AppState, selectAuthState } from '../state/app.states';
import { SignUp } from '../store/actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
    this.errorMessage = '';
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
    this.store.dispatch(new SignUp(payload));
  }
}