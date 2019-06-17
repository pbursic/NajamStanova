import { Component, OnInit } from "@angular/core";
import { RegistrationComponent } from "../registration/registration.component";
import { LoginComponent } from "../login/login.component";
import { Person } from "../models/person";
import { MatDialog } from "@angular/material";
import { LoginService } from "../shared/login/login.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
  providers: [LoginService]
})
export class ToolbarComponent implements OnInit {
  person: Person;
  submitted = false;
  isLoggedIn;

  constructor(private logoutService: LoginService, public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem("user");
  }

  logoutUser() {
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
