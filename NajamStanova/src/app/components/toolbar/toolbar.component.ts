import { Component, OnInit } from "@angular/core";
import { RegistrationComponent } from "../../screens/registration/registration.component";
import { LoginComponent } from "../../screens/login/login.component";
import { Person } from "../../models/person";
import { MatDialog } from "@angular/material";
import { LogoutService } from "../../services/logout/logout.service";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  providers: [LogoutService]
})
export class ToolbarComponent implements OnInit {
  person: Person;
  submitted = false;
  image: string = "../../../assets/images/UserIcon@2x.svg";
  //isLoggedIn;

  constructor(
    private logoutService: LogoutService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    //this.isLoggedIn = localStorage.getItem("user");
    //this.image = localStorage.getItem("user_image");
  }

  isLoggedIn() {
    this.image = localStorage.getItem("user_image");
    return localStorage.getItem("user");
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate([""]);

    this.submitted = true;

    console.log(this.person);

    this.save();
  }

  private save(): void {
    console.log(this.person);
    this.logoutService.logoutUser(this.person).subscribe();
  }

  /*openDialogRegistration(): void {
    const dialogRef = this.dialog.open(RegistrationComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: "500px"
      //  width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
    });
  }*/
}
