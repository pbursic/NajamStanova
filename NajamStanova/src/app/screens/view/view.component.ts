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

      if (window.location.href.indexOf("?") > -1) this.getParams();
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

  getParams() {
    return this.route.queryParams.subscribe(params => {
      this.array = this.array.filter(post => {
        this.postsForm.get("price").setValue(params["price"]);
        return post.price == params["price"];
      });
    });
  }

  filter() {
    window.history.replaceState(null, null, window.location.pathname);

    let price = this.postsForm.get("price").value;
    let hasDot = price.indexOf(".") > -1;
    let hasDecimal = price.indexOf(",00") > -1;
    let isFormated = price.indexOf(",00 kn") > -1;

    let formatPrice =
      hasDot && isFormated
        ? price
        : hasDecimal && hasDot
        ? price + " kn"
        : hasDot
        ? price + ",00 kn"
        : parseFloat(price)
            .toFixed(2)
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " kn";

    let params = new HttpParams().set("price", formatPrice);

    let href = window.location.href;
    if (href.indexOf("?") > -1) {
      window.location.href = href + "&" + params;
    } else {
      window.location.href = href + "?" + params;
    }

    this.getParams();
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
