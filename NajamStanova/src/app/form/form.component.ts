import { Component, OnInit } from "@angular/core";
import { PostService } from "../shared/post/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Posts } from "../models/posts";

export interface IType {
  value: String;
  viewValue: String;
}

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
  providers: [PostService]
})
export class FormComponent implements OnInit {
  postsForm: FormGroup;
  posts: Posts;
  submitted = false;

  types: IType[] = [
    { value: "stan", viewValue: "Stan" },
    { value: "studio", viewValue: "Studio" },
    { value: "kuca", viewValue: "Kuća" }
  ];

  constructor(private postService: PostService, private fb: FormBuilder) {}
  //formControls = this.postService.form.controls;

  ngOnInit() {
    this.postsForm = this.fb.group({
      status: false,
      title: [],
      description: [],
      bills_included: false,
      country: [],
      city: [],
      address: [],
      price: [],
      squares: [],
      type: [],
      available_date: [],
      walkout_date: [],
      furnished: false,
      bed: [],
      room: [],
      pet: false,
      parking: false
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.postsForm.invalid) {
      return;
    }

    this.posts = this.postsForm.value;
    console.log(this.posts);

    this.save();
  }

  private save() {
    this.postService.addPost(this.posts).subscribe();
  }

  get status() {
    return this.postsForm.get("status");
  }

  get title() {
    return this.postsForm.get("title");
  }

  get description() {
    return this.postsForm.get("description");
  }

  get bills_included() {
    return this.postsForm.get("bills_included");
  }

  get country() {
    return this.postsForm.get("country");
  }

  get city() {
    return this.postsForm.get("city");
  }

  get address() {
    return this.postsForm.get("address");
  }

  get price() {
    return this.postsForm.get("price");
  }

  get squares() {
    return this.postsForm.get("countsquaresry");
  }

  get type() {
    return this.postsForm.get("type");
  }

  get available_date() {
    return this.postsForm.get("available_date");
  }

  get walkout_date() {
    return this.postsForm.get("walkout_date");
  }

  get furnished() {
    return this.postsForm.get("furnished");
  }

  get bed() {
    return this.postsForm.get("bed");
  }

  get room() {
    return this.postsForm.get("room");
  }

  get pet() {
    return this.postsForm.get("pet");
  }

  get parking() {
    return this.postsForm.get("parking");
  }

  /*onSubmit(){
    this.submitted = true;
    if(this.postService.form.valid){
      if(this.postService.form.get('$key').value == null)
        //insert
        this.postService.insertPost(this.postService.form.value);
      //else
        //update
    this.submitted = false;
    }
  }*/
}
