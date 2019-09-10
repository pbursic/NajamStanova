import { Component, OnInit } from "@angular/core";
import { Posts } from "../../models/posts";
import { PostService } from "../../services/post/post.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
  providers: [PostService]
})
export class UserPostsComponent implements OnInit {
  posts: Posts;
  image: string = "assets/images/picture.svg";
  newPost = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postService.getUserPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  arrayPosts = [];
  getNewPosts(posts) {
    const newPosts = JSON.parse(localStorage.getItem("post_id"));

    if (newPosts.includes("" + posts.id)) {
      return true;
    }
    return false;
  }
}
