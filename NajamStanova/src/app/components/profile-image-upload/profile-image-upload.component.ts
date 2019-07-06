import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profile-image-upload",
  templateUrl: "./profile-image-upload.component.html",
  styleUrls: ["./profile-image-upload.component.scss"]
})
export class ProfileImageUploadComponent implements OnInit {
  imageUrl: String = "/assets/images/mobile.png";
  selectedFile: File = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onFileSelected(file: FileList) {
    this.selectedFile = file.item(0); // get first image

    //show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onUpload() {
    console.log("BYTEA: ", this.selectedFile);
    this.http.post("/registration", this.selectedFile).subscribe(event => {
      console.log(event);
    });
    /*const fd = new FormData();
    fd.append("image", this.selectedFile, this.selectedFile.name);
    this.http
      .post("/registration", this.selectedFile, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        console.log(event);
      });*/
  }
}
