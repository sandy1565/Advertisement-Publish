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

  getClient(id){
    return this.http.get(`${URN}client/${id}`,{
      headers: authHeader()
    })
  }

  updateClient(id, data){
    return this.http.put(`${URN}client/${id}`,data,{
      headers: authHeader()
    })
  }

  deleteClient(id) {
    console.log("hi");
    return this.http.delete(`${URN}client/${id}`, {
      headers: authHeader()
    })
  }


  getClients(){
    return this.http.get(`${URN}client`,{
      headers: authHeader()
    });
  }
}
