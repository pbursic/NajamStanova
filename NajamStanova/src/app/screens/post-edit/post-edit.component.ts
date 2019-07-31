import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Posts } from "../../models/posts";
import { ActivatedRoute, Params } from "@angular/router";

export interface IType {
  value: String;
  viewValue: String;
}

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"],
  providers: [PostService]
})
export class PostEditComponent implements OnInit {
  postsForm: FormGroup;
  post: Posts;
  submitted = false;
  imageUrl: string = "../../assets/images/picture.svg";
  selectedFile: File = null;
  arrayImages: File[] = [];
  images: any[] = [];
  deletedImages: any[] = [];
  newImages: string[] = [];

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
    const id = +this.route.snapshot.paramMap.get("id");

    this.postService.getUserPostDetails(id).subscribe(post => {
      console.log("POST: ", post);
      this.post = post;
      this.images = post.images;
      /*for (let im = 0; im < post.images.length; im++) {
        this.images.push((<any>post.images[im]).image); // (<any>post.images[im]).image
      }*/
      console.log("post.images: ", post.images);
      console.log("Images: ", this.images);
    });

    this.postsForm = this.fb.group({
      status: [false],
      title: [],
      description: [],
      bills_included: [false],
      country: [],
      city: [],
      address: [],
      price: [],
      squares: [],
      type: [],
      available_date: [],
      walkout_date: [],
      furnished: [false],
      bed: [],
      room: [],
      pet: [false],
      parking: [false]
    });
  }

  onFileSelected(file: FileList) {
    this.selectedFile = file.item(0); // get first image
    //this.arrayImages.push(this.selectedFile);

    //show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      console.log("imageUrl2: ", this.imageUrl);
      this.newImages.push(this.imageUrl);
      //console.log("reader.result: ", reader.result);
    };
    reader.readAsDataURL(this.selectedFile);

    console.log("images: ", this.newImages);
  }

  deleteImage(image) {
    //console.log("image: ", image);
    this.images.splice(this.images.indexOf(image), 1);

    console.log("Images: ", this.images);
    console.log("Image: ", image);
    console.log("Image id: ", image.id);
    this.deletedImages.push(image.id);
    console.log("this.deletedImages: ", this.deletedImages);
  }

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.submitted = true;

    if (this.postsForm.invalid) {
      return;
    }

    this.post = this.postsForm.value;
    this.post.id = id;
    this.post.images = this.newImages;
    this.post.deletedImages = this.deletedImages;
    console.log(this.post);

    this.save();
  }

  private save() {
    //this.postService.addPost(this.post).subscribe();
    this.postService.updatePost(this.post).subscribe();
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
