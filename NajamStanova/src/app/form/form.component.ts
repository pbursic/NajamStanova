import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /*constructor(private postService : PostService) { }
  submitted: boolean;
  formControls = this.postService.form.controls;

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true;
    if(this.postService.form.valid){
      if(this.postService.form.get('$key').value == null)
        //insert
        this.postService.insertPost(this.postService.form.value);
      //else
        //update
    this.submitted = false;
    }
  }*/

}
