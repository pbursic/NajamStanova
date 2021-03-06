import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login/login.service";
import { Person } from "../../models/person";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

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
  hide = true;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });

    //this.loginForm.valueChanges.subscribe(console.log);
  }

  getUser() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.person = this.loginForm.value;

    this.save();
  }

  private save(): void {
    this.loginService.getUser(this.person).subscribe(user => {
      localStorage.setItem("user", this.person.email);
      localStorage.setItem("user_image", user[0].image);
      //this.router.navigate(["/user-posts/" + this.person.id]);
      this.router.navigate(["/view"]);
    });
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
