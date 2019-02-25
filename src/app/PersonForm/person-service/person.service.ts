import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from './person.modal';
import { Floor, Block, Location, State, Cities, Country } from '../../services/commonModal';
import { URN } from '../../CommonConst/constURN';
import { authHeader } from '../../CommonConst/authHeader';
@Injectable({
  providedIn: 'root'
})
export class PersonService {
  selectedPerson = new EventEmitter<PersonModel>();
  constructor(private http: HttpClient) {
  }

  public getPerson() {
    return this.http.get(`${URN}getPerson`, {
      headers: authHeader()
    });
  }

  public getPersonDetails(id){
    return this.http.get(`${URN}getPersonData/${id}`,{
      headers: authHeader()
    })
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
    })
  }

  public deletePersonDetails(key: number) {
    return this.http.delete(`${URN}deletePerson/` + key, {
      headers: authHeader()
    });
  }

}
