import { Injectable, EventEmitter } from '@angular/core';
import { Form } from './service.model';
import { Block } from './service.model';
import { Location } from './service.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Floor } from './service.model';
import { URN } from '../../CommonConst/constURN';
import { authHeader } from '../../CommonConst/authHeader';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  selectedUser = new EventEmitter<Form>();
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${URN}getUser`, {
      headers: authHeader()
    });
  }

  addUser(user) {
    return this.http.post(`${URN}addUser`, user, {
      headers: authHeader()
    });
  }

  updateUser(user: Form, key: number) {
    console.log(key);
    return this.http.put(`${URN}updateUser/` + key, {
      user,
      headers: authHeader()
    });
  }

  deleteUser(key: number) {
    console.log('key', key);
    return this.http.delete(`${URN}deleteUser/` + key, {
      headers: authHeader()
    });
  }

  ////////////////////// block ////////////////////////

  public getBlock(): Observable<Block[]> {
    return this.http
      .get(`${URN}getBlock`, {
        headers: authHeader()
      })
      .pipe(map(data => <Block[]>data));
  }

  //////////////////// location ///////////////////////

  public getLocation(): Observable<Location[]> {
    return this.http.get(`${URN}getLocation`, {
        headers: authHeader()
      })
      .pipe(map(data => <Location[]>data));
  }

  /////////////////// floor /////////////////////////

  public getFloor(): Observable<Floor[]> {
    return this.http
      .get(`${URN}getFloor`, {
        headers: authHeader()
      })
      .pipe(map(data => <Floor[]>data));
  }
}
