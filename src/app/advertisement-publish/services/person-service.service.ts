import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Floor, Block, Location } from './person.model';
import { authHeader } from '../../CommonConst/authHeader';
import { URN } from '../../CommonConst/constURN';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) {}

  public getPerson() {
    return this.http.get(`${URN}getPerson`, {
      headers: authHeader()
    });
  }
  public getFloor(): Observable<Floor[]> {
    return this.http
      .get(`${URN}getFloor`, {
        headers: authHeader()
      })
      .pipe(map(data => <Floor[]>data));
  }

  public getBlock(): Observable<Block[]> {
    return this.http
      .get(`${URN}getBlock`, {
        headers: authHeader()
      })
      .pipe(map(data => <Block[]>data));
  }

  public getLocation(): Observable<Location[]> {
    return this.http
      .get(`${URN}getLocation`, {
        headers: authHeader()
      })
      .pipe(map(data => <Location[]>data));
  }
}
