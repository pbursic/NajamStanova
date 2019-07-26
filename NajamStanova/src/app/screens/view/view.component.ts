import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
  providers: [PostService]
})
export class ViewComponent implements OnInit {
  posts: Posts;
  image: string = "assets/images/picture.svg";

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  filter() {
    console.log("FILTER: ", this.posts);
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
