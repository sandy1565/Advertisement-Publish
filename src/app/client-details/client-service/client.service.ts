import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { authHeader } from '../../CommonConst/authHeader';
import { URN } from '../../CommonConst/constURN';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient) {}

  addClient(clientDetails) {
    console.log('hiiiiiiiiiiiiiiii');
    return this.http.post(`${URN}client`, clientDetails, {
      headers: authHeader()
    });
  }
}
