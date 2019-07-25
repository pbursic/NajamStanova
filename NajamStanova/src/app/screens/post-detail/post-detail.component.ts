import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { Images } from "../../models/images";
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
    { text: "", cols: 2, rows: 2, color: "#f9f9f9ff" }, // One
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Two
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Three
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Four
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" } // Five
  ];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");

    this.postService.getPost(id).subscribe(post => {
      console.log("POST: ", post);
      this.post = post;

      //for (var po = 0; po < Object.keys(post).length; po++) {
      for (var im = 0; im < post.images.length; im++) {
        this.tiles[im].text = (<any>post.images[im]).image;
      }

      //}
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
