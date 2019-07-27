import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Person } from "../../models/person";
import { Observable, empty } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getUser(person: Person): Observable<any> {
    return this.http.post<any>("/api/", person).pipe(
      map(res => {
        return res.rows;
      }),
      catchError((err, caught) => {
        console.log("err: ", err);
        console.log("caught: ", caught);
        this.snackbar.open(err.error, null, {
          duration: 3000
        });

        return empty();
      })
    );
  }

  logoutUser(person: Person): Observable<any> {
    return this.http.post<any>("/api/", person).pipe(
      map(res => {
        return res.rows;
      })
    );
  }
}
