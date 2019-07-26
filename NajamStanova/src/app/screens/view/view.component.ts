import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { Observable } from "rxjs/Observable";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
  providers: [PostService]
})
export class ViewComponent implements OnInit {
  posts: Posts;
  postsForm: FormGroup;
  image: string = "assets/images/picture.svg";
  array: Posts[] = [];

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;

      let keys = Object.keys(posts);

      for (let i = 0; i < keys.length; i++) {
        this.array.push(posts[i]);
      }
    });

    this.postsForm = this.fb.group({
      status: [],
      title: [],
      description: [],
      bills_included: [],
      country: [],
      city: [],
      address: [],
      price: [],
      squares: [],
      type: [],
      available_date: [],
      walkout_date: [],
      furnished: [],
      bed: [],
      room: [8],
      pet: [],
      parking: []
    });
  }

  filter() {
    let keys_p = Object.keys(this.posts);

    /*this.array = [];

    for (let i = 0; i < keys_p.length; i++) {
      if (this.fId(i)) this.array.push(this.posts[i]);
    }*/

    /*let keys_a = Object.keys(this.array);

    for (let i = 0; i < keys_a.length; i++) {
      this.posts = this.array[i];
    }*/
    console.log("array: ", this.array);
    console.log(
      "array: ",
      this.array.filter(post => {
        return post.id == 8;
      })
    );

    this.array = this.array.filter(post => {
      return post.id == 8;
    });

    console.log("array: ", this.array);

    // https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/
    let params = new HttpParams().set("id", this.postsForm.get("room").value);

    console.log("params: ", params.toString());

    let href = window.location.href;
    //window.location.href = href + "?" + params;
  }

  fId(i: number) {
    return this.postsForm.get("room").value
      ? this.posts[i].id == this.postsForm.get("room").value
      : false;
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
