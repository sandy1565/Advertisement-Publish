import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URN } from '../../CommonConst/constURN';
import { authHeader } from '../../CommonConst/authHeader';

@Injectable({
  providedIn: 'root'
})
export class AdvertisePublishService {
  // selectedUser = new EventEmitter<advertisePublish>();
  constructor(private http: HttpClient) {}

  id: any;

  getPublish() {
    return this.http.get(`${URN}getPublish`, {
      headers: authHeader()
    });
  }
  addPublish(advertisepublish) {
    return this.http.post(`${URN}advtPublish`, advertisepublish, {
      headers: authHeader()
    });
  }
}
