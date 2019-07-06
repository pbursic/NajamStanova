import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params } from "@angular/router";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  post: Posts;
  editable: boolean = false;
  contactVisible: boolean = false;
  isLoggedIn;

  tiles: Tile[] = [
    { text: "One", cols: 2, rows: 2, color: "#f9f9f9ff" },
    { text: "Two", cols: 1, rows: 1, color: "#f9f9f9ff" },
    { text: "Three", cols: 1, rows: 1, color: "#f9f9f9ff" },
    { text: "Four", cols: 1, rows: 1, color: "#f9f9f9ff" },
    { text: "Five", cols: 1, rows: 1, color: "#f9f9f9ff" }
  ];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");

    this.postService.getPost(id).subscribe(post => {
      this.post = post;
    });

    if (window.location.href.length > 40) {
      this.editable = true;
    }

    if (localStorage.getItem("user") && window.location.href.length <= 40) {
      this.isLoggedIn = localStorage.getItem("user");
      this.contactVisible = true;
    }
  }
}
