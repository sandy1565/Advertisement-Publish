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

  public addState(state) {
    return this.http.post(`${URN}state`,state, {
      headers: authHeader()
    });
  }
  
  public updateState(id,state) {
    return this.http.put(`${URN}state/${id}`,state, {
      headers: authHeader()
    });
  }

  public deleteState(id){
    return this.http.delete(`${URN}state/${id}`, {
      headers: authHeader()
    });
  }

  public addCity(city) {
    return this.http.post(`${URN}city`,city, {
      headers: authHeader()
    });
  }
  
  public updateCity(id,city) {
    return this.http.put(`${URN}city/${id}`,city, {
      headers: authHeader()
    });
  }

  public deleteCity(id){
    return this.http.delete(`${URN}city/${id}`, {
      headers: authHeader()
    });
  }


  public addLocation(location) {
    return this.http.post(`${URN}location`,location, {
      headers: authHeader()
    });
  }
  
  public updateLocation(id,location) {
    return this.http.put(`${URN}location/${id}`,location, {
      headers: authHeader()
    });
  }

  public deleteLocation(id){
    return this.http.delete(`${URN}location/${id}`, {
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

  public getSpecificLocationsDetails(location_id) {
    return this.http.get(`${URN}getLocation/${location_id}`, {
      headers: authHeader()
    });
  }


}