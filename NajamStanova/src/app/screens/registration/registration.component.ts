import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../../services/registration/registration.service";
import { Person } from "../../models/person";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  person: Person;
  submitted = false;
  isLoggedIn;
  imageUrl: string = "../../assets/images/UserIcon@2x.svg";
  selectedFile: File = null;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("user");

    if (this.isLoggedIn) {
      this.registrationForm = this.fb.group({
        name: [],
        surname: [],
        phone: [],
        email: [[Validators.required, Validators.email]],
        city: [],
        country: [],
        password: [
          [
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$"),
            Validators.minLength(6)
          ]
        ],
        birth_date: [],
        terms: [[Validators.requiredTrue]],
        image: []
      });

      //this.registrationForm.valueChanges.subscribe(console.log);
    } else {
      this.registrationForm = this.fb.group({
        name: "",
        surname: "",
        phone: [""],
        email: ["", [Validators.required, Validators.email]],
        city: "",
        country: "",
        password: [
          "",
          [
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$"),
            Validators.minLength(6)
          ]
        ],
        birth_date: [],
        /*day: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
        month: 1,
        year: 1995,*/
        terms: [false, [Validators.requiredTrue]],
        image: []
      });

      //this.registrationForm.valueChanges.subscribe(console.log);
    }
  }

  onFileSelected(file: FileList) {
    this.selectedFile = file.item(0); // get first image

    //show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      //console.log("imageUrl2: ", this.imageUrl);
      console.log("reader.result: ", reader.result);
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
    console.log("submitted ");
    if (this.registrationForm.invalid) {
      return;
    }

    this.person = this.registrationForm.value;
    //  this.person.image = this.selectedFile;
    this.person.image = this.imageUrl;

    this.save();
  }

  private save(): void {
    console.log("SAVE: ", this.person);

    this.registrationService.addPerson(this.person).subscribe();

    /*if (this.isLoggedIn) {
    } else {
      this.registrationService.addPerson(this.person).subscribe();
    }*/
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
