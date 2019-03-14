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

  public addDistricts(district){
    return this.http.post(`${URN}district`, district, {
      headers: authHeader()
    })
  }

  public getDistrictDetails(): Observable<State[]> {
    return this.http.get(`${URN}district`, {
      headers: authHeader()
    }).pipe(map(data => <State[]>data));
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


  public addDistrict(district) {
    return this.http.post(`${URN}district`,district, {
      headers: authHeader()
    });
  }
  
  public updateDistrict(id,district) {
    return this.http.put(`${URN}district/${id}`,district, {
      headers: authHeader()
    });
  }

  public deleteDistrict(id){
    return this.http.delete(`${URN}district/${id}`, {
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

  public addBlock(block) {
    return this.http.post(`${URN}block`,block, {
      headers: authHeader()
    });
  }
  
  public updateBlock(id,block) {
    return this.http.put(`${URN}block/${id}`,block, {
      headers: authHeader()
    });
  }

  public deleteBlock(id){
    return this.http.delete(`${URN}block/${id}`, {
      headers: authHeader()
    });
  }

  public addFloor(floor) {
    return this.http.post(`${URN}floor`,floor, {
      headers: authHeader()
    });
  }
  
  public updateFloor(id,floor) {
    return this.http.put(`${URN}floor/${id}`,floor, {
      headers: authHeader()
    });
  }

  public deleteFloor(id){
    return this.http.delete(`${URN}floor/${id}`, {
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

  public getSpecificDistrictDetails(state_id) {
    return this.http.get(`${URN}district/${state_id}`, {
      headers: authHeader()
    }).pipe(map(data => data));
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