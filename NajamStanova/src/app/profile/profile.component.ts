import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../shared/registration/registration.service";
import { Person } from "../models/person";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
  providers: [RegistrationService]
})
export class ProfileComponent implements OnInit {
  registrationForm: FormGroup;
  person: Person;
  submitted = false;
  isLoggedIn;
  imageUrl: String = "../../assets/images/UserIcon@2x.svg";
  selectedFile: File = null;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("user");

    this.registrationForm = this.fb.group({
      name: [Validators.required],
      surname: [Validators.required],
      phone: [Validators.required],
      email: this.isLoggedIn,
      city: [Validators.required],
      country: [Validators.required],
      image: []
    });

    this.registrationService.getPerson(this.isLoggedIn).subscribe(user => {
      //console.log("user", user[0].image);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        console.log("imageUrl: ", this.imageUrl);
      };
      //reader.readAsDataURL(user[0].image.data);
      this.person = user;
    });

    //this.registrationForm.valueChanges.subscribe(console.log);
  }

  onFileSelected(file: FileList) {
    this.selectedFile = file.item(0); // get first image

    //show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      //console.log("imageUrl2: ", this.imageUrl);
    };
    reader.readAsDataURL(this.selectedFile);
  }

  /*onUpload() {
      console.log("imageUrl: ", this.imageUrl);
      console.log("selectedFile: ", this.selectedFile);
      const fd = new FormData();
      fd.append("image", this.selectedFile);
    }*/

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.person = this.registrationForm.value;
    this.person.image = this.selectedFile;

    this.save();
  }

  private save(): void {
    this.registrationService.addPerson(this.person).subscribe();
  }

  get name() {
    return this.registrationForm.get("name");
  }

  get surname() {
    return this.registrationForm.get("surname");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get image() {
    return this.registrationForm.get("image");
  }

  get city() {
    return this.registrationForm.get("city");
  }

  get country() {
    return this.registrationForm.get("country");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  get phone() {
    return this.registrationForm.get("phone");
  }

  get birth_date() {
    return this.registrationForm.get("birth_date");
  }

  get terms() {
    return this.registrationForm.get("terms");
  }
}
