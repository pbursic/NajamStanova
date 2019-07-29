import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { Posts } from "../../models/posts";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

export interface IType {
  value: String;
  viewValue: String;
}

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

  types: IType[] = [
    { value: "stan", viewValue: "Stan" },
    { value: "studio", viewValue: "Studio" },
    { value: "kuca", viewValue: "Kuća" }
  ];

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
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
      room: [],
      pet: [],
      parking: []
    });
  }

  readonly price = "price";
  readonly city = "city";
  readonly type = "type";
  readonly bed = "bed";
  readonly room = "room";
  readonly furnished = "furnished";
  readonly parking = "parking";
  readonly pet = "pet";
  noDataFound = false;

  getParams() {
    return this.route.queryParams.subscribe(params => {
      this.array = this.array.filter(post => {
        this.setFilterForm(params);

        return (
          this.getFilteredParam(params, this.price, post.price) &&
          this.getFilteredParam(params, this.city, post.city) &&
          this.getFilteredParam(params, this.type, post.type) &&
          this.getFilteredParam(params, this.bed, post.bed) &&
          this.getFilteredParam(params, this.room, post.room) &&
          this.getBoolParam(params, this.furnished) &&
          this.getBoolParam(params, this.parking) &&
          this.getBoolParam(params, this.pet)
        );
      });
      if (this.array.length == 0) this.noDataFound = true;
    });
  }

  getParamValue(params, key) {
    return params[key];
  }

  getFilteredParam(params, key: string, element) {
    return params[key] != null ? element == params[key] : true;
  }

  getBoolParam(params, key: string) {
    return params[key] != null ? params[key] : true;
  }

  setFilterForm(params) {
    this.setControlValue(params, this.price);
    this.setControlValue(params, this.city);
    this.setControlValue(params, this.type);
    this.setControlValue(params, this.bed);
    this.setControlValue(params, this.room);
    this.setControlValue(params, this.furnished);
    this.setControlValue(params, this.parking);
    this.setControlValue(params, this.pet);
  }

  setControlValue(params, key) {
    this.postsForm.get(key).setValue(params[key]);
  }

  filter() {
    window.history.replaceState(null, null, window.location.pathname);

    let params = new HttpParams(),
      formValue = this.postsForm.value,
      href = window.location.href;

    params = this.setHttpParams(params, formValue);

    if (params.keys().length != 0) {
      href.indexOf("?") > -1
        ? (window.location.href = href + "&" + params)
        : (window.location.href = href + "?" + params);
    } else if (this.postsForm.touched) window.location.href = href;
  }

  clearFilter() {}

  setHttpParams(params, formValue) {
    if (formValue.price != "" && formValue.price != null)
      params = this.setParam(
        params,
        this.price,
        this.formatPrice(formValue.price)
      );
    params = this.checkFormValue(params, this.city, formValue.city);
    params = this.checkFormValue(params, this.type, formValue.type);
    params = this.checkFormValue(params, this.bed, formValue.bed);
    params = this.checkFormValue(params, this.room, formValue.room);
    params = this.checkFormValue(params, this.furnished, formValue.furnished);
    params = this.checkFormValue(params, this.parking, formValue.parking);
    params = this.checkFormValue(params, this.pet, formValue.pet);
    return params;
  }

  checkFormValue(params, key: string, value) {
    if (value != "" && value != null)
      params = this.setParam(params, key, value);
    return params;
  }

  setParam(params, key: string, value) {
    return params.set(key, value);
  }

  formatPrice(price) {
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

    return formatPrice;
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
