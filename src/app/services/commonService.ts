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

  public addCountry(country) {
    return this.http.post(`${URN}country`,country, {
      headers: authHeader()
    });
  }
  
  public updateCountry(id,country) {
    return this.http.put(`${URN}country/${id}`,country, {
      headers: authHeader()
    });
  }

  public deleteCountry(id){
    return this.http.delete(`${URN}country/${id}`, {
      headers: authHeader()
    });
  }

  public getStateDetails(): Observable<State[]> {
    return this.http.get(`${URN}getState`, {
      headers: authHeader()
    }).pipe(map(data => <State[]>data));
  }

  public getSpecificStateDetails(country_id): Observable<State[]> {
    return this.http.get(`${URN}getState/${country_id}`, {
      headers: authHeader()
    }).pipe(map(data => <State[]>data));
  }

  public getCitiesDetails(): Observable<Cities[]> {
    return this.http.get(`${URN}getCities`, {
      headers: authHeader()
    }).pipe(map(data => <Cities[]>data));
  }


  public getSpecificCitiesDetails(state_id): Observable<Cities[]> {
    return this.http.get(`${URN}getCities/${state_id}`, {
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