import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { MapComponent } from "./map/map.component";
import { FormComponent } from "./form/form.component";
import { ViewComponent } from "./view/view.component";
import { UserPostsComponent } from "./user-posts/user-posts.component";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuardService } from "./shared/auth-guard/auth-guard.service";

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
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
