import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AdvtModel, ClientModel } from "./advtDetails.model";
import { URN } from "../../CommonConst/constURN";
import { authHeader } from "../../CommonConst/authHeader";

@Injectable({
  providedIn: "root"
})
export class AdvtDetailsService {
  constructor(private http: HttpClient) {}

  public getAdvtDetails() {
    return this.http.get(`${URN}getAdvt`, {
      headers: authHeader()
    });
  }

  public addAdvtDetails(details) {
    return this.http.post(`${URN}addAdvt`, details, {
      headers: authHeader()
    });
  }

  public updateAdvtDetails(details: AdvtModel, key: number) {
    return this.http.put(`${URN}updateAdvt/` + key, { details, headers: authHeader()
    });
  }

  public deleteAdvt(key: number) {
    return this.http.delete(`${URN}deleteAdvt/` + key, {
      headers: authHeader()
    });
  }

  public getClient(): Observable<ClientModel[]> {
    return this.http
      .get(`${URN}getClient` ,{
        headers: authHeader()
      })
      .pipe(map(data => < ClientModel[]>data ));
  }
}
