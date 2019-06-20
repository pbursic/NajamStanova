import { Component, OnInit } from "@angular/core";
import { Posts } from "../models/posts";
import { PostService } from "../shared/post/post.service";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
  providers: [PostService]
})
export class UserPostsComponent implements OnInit {
  posts: Posts;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
