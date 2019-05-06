import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { MapComponent } from './map/map.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'view',
    component: ViewComponent
  },
  {
    path: 'view/post-detail/:id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
