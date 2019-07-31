import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError, filter } from "rxjs/operators";
import { Posts } from "../../models/posts";
import { Images } from "../../models/images";
import { Observable, empty } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class PostService {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  getAllPosts(): Observable<Posts> {
    return this.http.get<any>("/api/view").pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  getUserPosts(): Observable<Posts> {
    return this.http.get<any>(`/api/user-posts`).pipe(
      map(res => {
        return res.rows;
      }),
      catchError((err, caught) => {
        this.snackbar.open(err, null, {
          duration: 3000
        });

        return Observable.throw(err);
      })
    );
  }

  getPost(id: number): Observable<Posts> {
    return this.http.get<any>(`/api/view/post-detail/${id}`).pipe(
      map(res => {
        return res.rows[0];
      })
    );
  }

  getUserPostDetails(id: number): Observable<Posts> {
    return this.http
      .get<any>(`/api/user-posts/post-detail/${id}/post-edit`)
      .pipe(
        map(res => {
          return res.rows[0];
        })
      );
  }

  updatePost(post: Posts): Observable<any> {
    return this.http
      .post<any>(`/api/user-posts/post-detail/${post.id}/post-edit`, post)
      .pipe(
        map(res => {
          console.log(res);
          return res.rows;
        })
      );
  }

  addPost(post: Posts): Observable<any> {
    return this.http.post<any>(`/api/form`, post).pipe(
      map(res => {
        console.log(res);
        return res.rows;
      })
    );
  }

  getImages(id: number): Observable<any> {
    return this.http.get<any>(`/api/view/post-detail/${id}`).pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  updateStatus(id: number, status: boolean): Observable<any> {
    return this.http
      .put<any>(`/api/user-posts/post-detail/${id}`, { id, status })
      .pipe(
        map(res => {
          return res.rows;
        })
      );
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`/api/user-posts/post-detail/${id}`).pipe(
      map(res => {
        return res.rows;
      })
    );
  }

  /*addImages(images: string[]): Observable<any> {
    //var fd = new FormData();

    console.log("images test: ", images);
    return this.http.post<any>(`/form`, images).pipe(
      map(res => {
        console.log(res);
        return res.rows;
      })
    );
  }*/

  /*getPerson() {
    return this.http.get<any>("/person/:id").pipe(
      map(res => {
        return res.rows;
      })
    );
  }*/
}
