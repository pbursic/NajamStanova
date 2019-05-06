import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPosts } from '../../models/posts'
import { Observable } from 'rxjs';

@Injectable()
export class PostService {

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<IPosts[]>{
    return this.http.get<any>('/view').pipe(map((res) => {
      console.log(res);
      return res.rows;
    }));
  }

  getPost(id: number): Observable<IPosts[]>{
    return this.http.get<any>(`/view/post-detail/${id}`).pipe(map((res) => {
      console.log(res);
      return res.rows;
    }));
  }

  getPerson(){
    return this.http.get<any>('/person/:id').pipe(map((res) => {
      console.log(res);
      return res.rows;
    }));
  }

}
