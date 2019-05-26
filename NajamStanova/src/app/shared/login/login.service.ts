import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Person } from "../../models/person";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getUser(person: Person): Observable<any> {
    return this.http.post<any>("/", person).pipe(
      map(res => {
        console.log(res);
        return res.rows;
      })
    );
  }
}
