import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {  Floor, Block, Location, State, Cities, Country } from './commonModal';
import { URN } from '../CommonConst/constURN';
import { authHeader } from '../CommonConst/authHeader';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {
  }

  public getCountryDetails(): Observable<Country[]> {
    return this.http.get(`${URN}getCountryDetails`, {
      headers: authHeader()
    }).pipe(map(data => < Country[]>data ));
  }

  public getStateDetails(): Observable<State[]> {
    return this.http.get(`${URN}getState`, {
      headers: authHeader()
    }).pipe(map(data => <State[]>data));
  }

  public getCitiesDetails(): Observable<Cities[]> {
    return this.http.get(`${URN}getCities`, {
      headers: authHeader()
    }).pipe(map(data => <Cities[]>data));
  }

  public getFloor(): Observable<Floor[]> {
    return this.http.get(`${URN}getFloor`, {
      headers: authHeader()
    }).pipe(map(data => <Floor[]>data));
  }

  public getBlock(): Observable<Block[]> {
    return this.http.get(`${URN}getBlock`, {
      headers: authHeader()
    }).pipe(map(data => <Block[]>data));
  }

  public getLocation(locationData) {
    return this.http.post(`${URN}getLocation`, locationData, {
      headers: authHeader()
    });
  }

}