import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";

import { AppRoutingModule } from "./app-routing.module";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ToolbarComponent } from "./toolbar/toolbar.component";
import { FooterComponent } from "./footer/footer.component";
import { LandingComponent } from "./landing/landing.component";
import { MapComponent } from "./map/map.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { FormComponent } from "./form/form.component";
import { ViewComponent } from "./view/view.component";

import { PostService } from "./shared/post/post.service";
import { HttpClientModule } from "@angular/common/http";
//import {AngularFireModule} from 'angularfire2';
//import {AngularFireDatabaseModule} from 'angularfire2/database';
import { environment } from "src/environments/environment";
import { PostDetailComponent } from "./post-detail/post-detail.component";
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";

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
    LoginComponent
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
