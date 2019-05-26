import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { Person } from "../models/person";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  person: Person;
  submitted = false;

  constructor(private loginService: LoginService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["marko@gmail.com", [Validators.required, Validators.email]],
      password: [
        "lozinka9",
        [
          Validators.required
          /*Validators.pattern("^(?=.*[0-9])(?=.[a-zA-Z])([a-zA-Z0-9]+)$"),
          Validators.minLength(6)*/
        ]
      ]
    });

    this.loginForm.valueChanges.subscribe(console.log);
  }

  getUser() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.person = this.loginForm.value;
    console.log(this.person);

    this.save();
  }

  private save(): void {
    console.log(this.person);
    this.loginService.getUser(this.person).subscribe();
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
