import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Person } from "../../models/person";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  addPerson(person: Person): Observable<any> {
    var fd = new FormData();

    for (var key in person) {
      if (person.hasOwnProperty(key)) {
        fd.append(key, person[key]);
      }
    }

    /*fd.append("name", person.name);
    fd.append("image", person.image);
    fd.append("email", person.email);

    (<any>window).nesto = fd;

    console.log((<any>fd).entries());

    console.log("fd: ", fd);*/
    /*console.log("person: ", person);*/

    return this.http.post<any>("/registration", fd).pipe(
      map(res => {
        console.log(res);
        return res.rows;
      })
    );
  }
}
