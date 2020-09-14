import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectAuthState } from '../state/app.states';
import { LogOut } from '../store/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  checkBoxValue: boolean;
  user = null;
  errorMessage = null;

  constructor(
    private store: Store<AppState>
  ) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
      this.errorMessage = state.errorMessage;
    });

    this.checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (this.checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }

  changeTheme(): void {
    this.checkBoxValue = ( document.getElementById('theme') as HTMLInputElement).checked;
    if (this.checkBoxValue) {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = 'dimgray');
      document.body.style.backgroundColor = 'lavender';
    } else {
      Array.from(document.getElementsByClassName('forTheme') as HTMLCollectionOf<HTMLElement>).forEach( ele => ele.style.backgroundColor = '#008cba');
      document.body.style.backgroundColor = 'white';
    }
  }

}
