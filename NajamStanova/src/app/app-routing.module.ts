import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./screens/landing/landing.component";
import { MapComponent } from "./screens/map/map.component";
import { FormComponent } from "./screens/form/form.component";
import { ViewComponent } from "./screens/view/view.component";
import { UserPostsComponent } from "./screens/user-posts/user-posts.component";
import { PostDetailComponent } from "./screens/post-detail/post-detail.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { AuthGuardService } from "./services/auth-guard/auth-guard.service";
import { LoginComponent } from "./screens/login/login.component";
import { RegistrationComponent } from "./screens/registration/registration.component";
import { PostEditComponent } from "./screens/post-edit/post-edit.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  /*{
    path: "map",
    component: MapComponent
  },*/
  {
    path: "form",
    component: FormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "view",
    component: ViewComponent
  },
  {
    path: "user-posts",
    component: UserPostsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "view/post-detail/:id",
    component: PostDetailComponent
  },
  {
    path: "user-posts/post-detail/:id",
    component: PostDetailComponent
  },
  {
    path: "user-posts/post-detail/:id/post-edit",
    component: PostEditComponent
  },
  {
    path: "profile/:email",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "login/registration",
    component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
