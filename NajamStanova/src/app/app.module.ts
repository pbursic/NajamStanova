import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";

import { AppRoutingModule } from "./app-routing.module";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { FooterComponent } from "./screens/footer/footer.component";
import { LandingComponent } from "./screens/landing/landing.component";
import { MapComponent } from "./screens/map/map.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { FormComponent } from "./screens/form/form.component";
import { ViewComponent } from "./screens/view/view.component";

import { PostService } from "./services/post/post.service";
import { HttpClientModule } from "@angular/common/http";
//import {AngularFireModule} from 'angularfire2';
//import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from "src/environments/environment";
import { PostDetailComponent } from "./screens/post-detail/post-detail.component";
import { RegistrationComponent } from "./screens/registration/registration.component";
import { LoginComponent } from "./screens/login/login.component";
import { ProfileToolbarComponent } from "./components/profile-toolbar/profile-toolbar.component";
import { UserPostsComponent } from "./screens/user-posts/user-posts.component";
import { ProfileComponent } from "./screens/profile/profile.component";
import { ProfileImageUploadComponent } from "./components/profile-image-upload/profile-image-upload.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "map",
    component: MapComponent
  },
  {
    path: "form",
    component: FormComponent
  },
  {
    path: "view",
    component: ViewComponent
  },
  {
    path: "registration",
    component: RegistrationComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "user-posts",
    component: UserPostsComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    LandingComponent,
    MapComponent,
    SidenavComponent,
    FormComponent,
    ViewComponent,
    PostDetailComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileToolbarComponent,
    UserPostsComponent,
    ProfileComponent,
    ProfileImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBoN1B0apITPX4oS5JM-aBf89jTDpjBfo0"
    })
  ],
  entryComponents: [RegistrationComponent, LoginComponent],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule {}
