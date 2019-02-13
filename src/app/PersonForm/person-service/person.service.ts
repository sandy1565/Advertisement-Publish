import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PersonModel, Floor, Block, Location, State, Cities, Country } from './person.modal';
import { URN } from '../../CommonConst/constURN';
import { authHeader } from '../../CommonConst/authHeader';
@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  selectedPerson = new EventEmitter<PersonModel>();
  constructor(private http: HttpClient) {
  }

  public getPerson() {
    return this.http.get(`${URN}getPerson`, {
      headers: authHeader()
    });
  }

  public getPersons(id: number): Observable<PersonModel> {
    return this.http.get<PersonModel>(`${URN}getPerson`, {
      headers: authHeader()
    });
  }

  public addPersonDetails(person) {
    return this.http.post(`${URN}advtPerson`, person, {
      headers: authHeader()
    });
  }

  public updatePersonDetail(person, key: number) {
    return this.http.put(`${URN}updatePerson/` + key, person, {
      headers: authHeader()
    }).subscribe(data => {
      console.log(data);
      if (status === '200') {
        console.log('sand');
      }
    });
  }

  public deletePersonDetails(key: number) {
    return this.http.delete(`${URN}deletePerson/` + key, {
      headers: authHeader()
    });
  }

  public getCountryDetails(): Observable<Country[]> {
    return this.http.get(`${URN}getCountryDetails`, {
      headers: authHeader()
    }).pipe(map(data => <Country[]>data));
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

  // public getLocation(locationData): Observable<Location[]> {
  //   return this.http.get('http://localhost:3001/api/getLocation').pipe(map(data => <Location[]>data));
  // }

  // public getLocation(locationData){
  //   return this.http.get('http://localhost:3001/api/getLocation',locationData, { responseType: "JSON" });
  // }

  public getLocation(locationData) {
    return this.http.post(`${URN}getLocation`, locationData, {
      headers: authHeader()
    });
  }


}
