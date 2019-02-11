import { Injectable } from '@angular/core';
import { Http, ResponseType } from '@angular/http';
import { URN } from '../CommonConst/constURN';
// import { authHeader } from '../CommonConst/authHeader';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: Http) {}
  getLogin(user) {
    return this.http.post(`${URN}login`, user );
  }
  }
