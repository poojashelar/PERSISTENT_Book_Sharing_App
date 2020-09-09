import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, tap, switchMap } from 'rxjs/operators';


import { AuthService } from '../../userServices/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure,
  LogOut,
} from '../actions/auth.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    mergeMap(payload =>
       this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          if (user.length > 0) {
            return new LogInSuccess({token: user.token, email: payload.email});
          }
          else {
            return new LogInFailure({ error: 'no user found' });
          }
        }),
        catchError(err => of(new LogInFailure({ error: err })))
    )));

@Effect({ dispatch: false })
LogInSuccess: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

@Effect({ dispatch: false })
LogInFailure: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

// @Effect()
// SignUp: Observable < any > =
//   this.actions.pipe(
//     ofType(AuthActionTypes.SIGNUP),
//     map((action: SignUp) => action.payload),
//     mergeMap((payload) =>
//      this.authService.signUp(payload.email, payload.password).pipe(
//       map(
//         (user) => {
//           return new SignUpSuccess({token: user.token, email: payload.email});
//         }
//       ),
//       catchError(err => of(new SignUpFailure({ error: err }))
//   )
//   )));

@Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: SignUp) => action.payload),
    switchMap(payload =>
      this.authService.logIn(payload.email, payload.password).pipe(
        map((user) => {
          if (user.length <= 0) {
            return this.authService.signUp(payload.email, payload.password).pipe(
              map((newUser) => {
                return new SignUpSuccess({token: newUser.token, email: payload.email});
              }),
              catchError((err) => of(new SignUpFailure({ error: err }))
              )
            );
          }
          else {
             return new SignUpFailure({ error: 'User already exists' });
          }
        }
      )
    )
  ));

@Effect({ dispatch: false })
SignUpSuccess: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

@Effect({ dispatch: false })
SignUpFailure: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

@Effect({ dispatch: false })
  public LogOut: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

@Effect({ dispatch: false })
GetStatus: Observable < any > = this.actions.pipe(
    ofType(AuthActionTypes.GET_STATUS),
    switchMap(payload => {
      return this.authService.getStatus();
    }));

}
