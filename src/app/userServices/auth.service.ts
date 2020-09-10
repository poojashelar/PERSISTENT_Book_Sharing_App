import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const payload =  {"email": email, "password": password }
    return this.http.post(`${environment.appUrl}login` , payload)
    .pipe(map(data => {
        return data;
    }));
  //  return this.http.get<User>(`${this.BASE_URL}?email=${email}&&password=${password}`);
  }

  signUp(email: string, password: string): Observable<User> {
    const payload =  {"email": email, "password": password }
    return this.http.post(`${environment.appUrl}register`, payload)
    .pipe(map(data => {
        return data;
    }));
  }

  // getStatus(): Observable<User> {
  //   const url = `${this.BASE_URL}/status`;
  //   return this.http.get<User>(url);
  // }
}
