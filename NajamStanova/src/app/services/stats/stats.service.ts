import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, filter } from "rxjs/operators";
import { Posts } from "../../models/posts";
import { Images } from "../../models/images";
import { Observable, empty } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class StatsService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getAvgStats(): Observable<any> {
    return this.http.get<any>("/api").pipe(
      map(res => {
        return res.rows;
      })
    );
  }
}
