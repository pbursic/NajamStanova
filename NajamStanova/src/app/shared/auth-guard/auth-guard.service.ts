import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): //route: ActivatedRouteSnapshot,
  //state: RouterStateSnapshot
  boolean {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate([""]); // /login
      return false;
    }
  }
}
