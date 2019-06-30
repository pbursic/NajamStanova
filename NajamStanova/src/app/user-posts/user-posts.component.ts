import { Component, OnInit } from "@angular/core";
import { Posts } from "../models/posts";
import { PostService } from "../shared/post/post.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-user-posts",
  templateUrl: "./user-posts.component.html",
  styleUrls: ["./user-posts.component.scss"],
  providers: [PostService]
})
export class UserPostsComponent implements OnInit {
  posts: Posts;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");

    this.postService.getUserPosts(id).subscribe(posts => {
      this.posts = posts;
    });
  }
}
