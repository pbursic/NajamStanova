import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Posts } from "../../models/posts";
import { Observable } from "rxjs";

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Posts> {
    return this.http.get<any>("/view").pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  getUserPosts(id: number): Observable<Posts> {
    return this.http.get<any>(`/user-posts/${id}`).pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  getPost(id: number): Observable<Posts> {
    return this.http.get<any>(`/view/post-detail/${id}`).pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  addPost(post: Posts): Observable<any> {
    return this.http.post<any>(`/form`, post).pipe(
      map(res => {
        console.log(res);
        return res.rows;
      })
    );
  }

  /*getPerson() {
    return this.http.get<any>("/person/:id").pipe(
      map(res => {
        return res.rows;
      })
    );
  }*/
}
