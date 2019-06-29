import { Component, OnInit } from "@angular/core";
import { RegistrationService } from "../shared/registration/registration.service";
import { Person } from "../models/person";
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
  imageUrl: String = "/assets/images/mobile.png";
  selectedFile: File = null;

  constructor(
    private registrationService: RegistrationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("user");

    if (this.isLoggedIn) {
      this.registrationForm = this.fb.group({
        name: "Marko",
        surname: "Maric",
        email: ["marko@gmail.com", [Validators.required, Validators.email]],
        city: "Rovinj",
        country: "Hrvatska",
        password: [
          "lozinka9",
          [
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$"),
            Validators.minLength(6)
          ]
        ],
        day: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
        month: 1,
        year: 1995,
        terms: [false, [Validators.requiredTrue]],
        image: []
      });

      //this.registrationForm.valueChanges.subscribe(console.log);
    } else {
      this.registrationForm = this.fb.group({
        name: "Marko",
        surname: "Maric",
        email: ["test9@gmail.com", [Validators.required, Validators.email]],
        city: "Rovinj",
        country: "Hrvatska",
        password: [
          "lozinka9",
          [
            Validators.required,
            Validators.pattern("^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$"),
            Validators.minLength(6)
          ]
        ],
        day: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
        month: 1,
        year: 1995,
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
      console.log("imageUrl2: ", this.imageUrl);
    };
    reader.readAsDataURL(this.selectedFile);

    console.log("imageUrl: ", this.imageUrl);
    console.log("selectedFile: ", this.selectedFile);
  }

  onUpload() {
    console.log("imageUrl: ", this.imageUrl);
    console.log("selectedFile: ", this.selectedFile);
    const fd = new FormData();
    fd.append("image", this.selectedFile);
    /*this.http
      .post("/registration", this.selectedFile, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        console.log(event);
      });*/
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    //let Params = new HttpParams();

    //Params = Params.append('name', this.registrationForm.value.name);
    //console.log(Params);

    //this.person.name = this.registrationForm.value.name;
    this.person = this.registrationForm.value;
    this.person.image = this.selectedFile;
    //console.log(this.person);

    this.save();
  }

  private save(): void {
    console.log(this.person);

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

  get day() {
    return this.registrationForm.get("day");
  }

  get month() {
    return this.registrationForm.get("month");
  }

  get year() {
    return this.registrationForm.get("year");
  }

  get terms() {
    return this.registrationForm.get("terms");
  }
}
