import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { Images } from "../../models/images";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router } from "@angular/router";

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
  id;
  image: string = "../../../assets/images/UserIcon@2x.svg";

  tiles: Tile[] = [
    { text: "", cols: 2, rows: 2, color: "#f9f9f9ff" }, // One
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Two
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Three
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" }, // Four
    { text: "", cols: 1, rows: 1, color: "#f9f9f9ff" } // Five
  ];

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get("id");

    this.postService.getPost(this.id).subscribe(post => {
      //console.log("POST: ", post);
      this.post = post;

      //for (var po = 0; po < Object.keys(post).length; po++) {
      for (let im = 0; im < post.images.length; im++) {
        this.tiles[im].text = (<any>post.images[im]).image;
      }

      //}
    });

    if (window.location.href.indexOf("user-posts") > -1) {
      // window.location.href.length > 40
      this.editable = true;
    }

    if (
      localStorage.getItem("user") &&
      window.location.href.indexOf("view") > -1
    ) {
      // window.location.href.length <= 40
      //this.isLoggedIn = localStorage.getItem("user");
      this.isLoggedIn = this.getLoggedIn();
      this.contactVisible = true;
    }
  }

  getLoggedIn() {
    this.image = localStorage.getItem("user_image");
    return localStorage.getItem("user");
  }

  changeStatus(status) {
    this.postService.updateStatus(this.id, status).subscribe();
    this.router.navigate(["/user-posts"]);
  }

  deletePost() {
    this.postService.deletePost(this.id).subscribe();
    this.router.navigate(["/user-posts"]);
  }
}
