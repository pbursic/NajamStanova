import { Component, OnInit } from "@angular/core";
import { PostService } from "../../services/post/post.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Posts } from "../../models/posts";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

export interface IType {
  value: String;
  viewValue: String;
}

export interface CityGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"],
  providers: [PostService]
})
export class PostEditComponent implements OnInit {
  postsForm: FormGroup;
  post: Posts;
  submitted = false;
  imageUrl: string = "../../assets/images/picture.svg";
  selectedFile: File = null;
  arrayImages: File[] = [];
  images: any[] = [];
  deletedImages: any[] = [];
  newImages: string[] = [];

  types: IType[] = [
    { value: "stan", viewValue: "Stan" },
    { value: "studio", viewValue: "Studio" },
    { value: "kuca", viewValue: "Kuća" }
  ];

  cityGroups: CityGroup[] = [
    {
      letter: "A",
      names: []
    },
    {
      letter: "B",
      names: [
        "Bakar",
        "Beli Manastir",
        "Belišće",
        "Benkovac",
        "Biograd na Moru",
        "Bjelovar",
        "Buje",
        "Buzet"
      ]
    },
    {
      letter: "C",
      names: ["Cres", "Crikvenica"]
    },
    {
      letter: "Č",
      names: ["Čabar", "Čakovec", "Čazma"]
    },
    {
      letter: "Ć",
      names: []
    },
    {
      letter: "D",
      names: [
        "Daruvar",
        "Delnice",
        "Donja Stubica",
        "Donji Miholjac",
        "Drniš",
        "Dubrovnik",
        "Duga Resa",
        "Dugo Selo"
      ]
    },
    {
      letter: "Dž",
      names: []
    },
    {
      letter: "Đ",
      names: ["Đakovo", "Đurđevac"]
    },
    {
      letter: "E",
      names: []
    },
    {
      letter: "F",
      names: []
    },
    {
      letter: "G",
      names: ["Garešnica", "Glina", "Gospić", "Grubišno Polje"]
    },
    {
      letter: "H",
      names: ["Hrvatska Kostajnica", "Hvar"]
    },
    {
      letter: "I",
      names: ["Ilok", "Imotski", "Ivanec", "Ivanić-Grad"]
    },
    {
      letter: "J",
      names: ["Jastrebarsko"]
    },
    {
      letter: "K",
      names: [
        "Karlovac",
        "Kastav",
        "Kaštela",
        "Klanjec",
        "Knin",
        "Komiža",
        "Koprivnica",
        "Korčula",
        "Kraljevica",
        "Krapina",
        "Križevci",
        "Krk",
        "Kutina",
        "Kutjevo"
      ]
    },
    {
      letter: "L",
      names: ["Labin", "Lepoglava", "Lipik", "Ludberg"]
    },
    {
      letter: "Lj",
      names: []
    },
    {
      letter: "M",
      names: ["Makarska", "Mali Lošinj", "Metković", "Mursko Središće"]
    },
    {
      letter: "N",
      names: [
        "Našice",
        "Nin",
        "Nova Gradiška",
        "Novalja",
        "Novigrad",
        "Novi Marof",
        "Novi Vinodolski",
        "Novska"
      ]
    },
    {
      letter: "Nj",
      names: []
    },
    {
      letter: "O",
      names: [
        "Obrovac",
        "Ogulin",
        "Omiš",
        "Opatija",
        "Opuzen",
        "Orahovica",
        "Oroslavje",
        "Osijek",
        "Otočac",
        "Otok",
        "Ozalj"
      ]
    },
    {
      letter: "P",
      names: [
        "Pag",
        "Pakrac",
        "Pazin",
        "Petrinja",
        "Pleternica",
        "Ploče",
        "Popovača",
        "Poreč",
        "Požega",
        "Pregrada",
        "Prelog",
        "Pula"
      ]
    },
    {
      letter: "R",
      names: ["Rab", "Rijeka", "Rovinj"]
    },
    {
      letter: "S",
      names: [
        "Samobor",
        "Senj",
        "Sinj",
        "Sisak",
        "Skradin",
        "Slatina",
        "Slavonski Brod",
        "Slunj",
        "Solin",
        "Split",
        "Stari Grad",
        "Supetar",
        "Sveta Nedjelja",
        "Sveti Ivan Zelina"
      ]
    },
    {
      letter: "Š",
      names: ["Šibenik"]
    },
    {
      letter: "T",
      names: ["Trilj", "Trogir"]
    },
    {
      letter: "U",
      names: ["Umag"]
    },
    {
      letter: "V",
      names: [
        "Valpovo",
        "Varaždin",
        "Varaždinske Toplice",
        "Velika Gorica",
        "Vinkovci",
        "Virovitica",
        "Vis",
        "Vodice",
        "Vodnjan",
        "Vrbovec",
        "Vrbovsko",
        "Vrgorac",
        "Vrlika",
        "Vukovar"
      ]
    },
    {
      letter: "Z",
      names: ["Zabok", "Zadar", "Zagreb", "Zaprešić", "Zlatar"]
    },
    {
      letter: "Ž",
      names: ["Županja"]
    }
  ];

  cityGroupOptions: Observable<CityGroup[]>;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("id");

    this.postService.getUserPostDetails(id).subscribe(post => {
      //console.log("POST: ", post);
      this.post = post;
      if (post.images.length != 0) this.images = post.images;
      /*for (let im = 0; im < post.images.length; im++) {
        this.images.push((<any>post.images[im]).image); // (<any>post.images[im]).image
      }*/
      //console.log("post.images: ", post.images);
      //console.log("Images: ", this.images);
    });

    this.postsForm = this.fb.group({
      status: [false],
      title: [],
      description: [],
      bills_included: [false],
      country: ["Hrvatska"],
      cityGroup: [],
      address: [],
      price: [],
      squares: [],
      type: [],
      available_date: [],
      walkout_date: [],
      furnished: [false],
      bed: [],
      room: [],
      pet: [false],
      parking: [false],
      wifi: [false]
    });

    this.cityGroupOptions = this.postsForm.get("cityGroup")!.valueChanges.pipe(
      startWith(""),
      map(value => this._filterGroup(value))
    );
  }

  private _filterGroup(value: string): CityGroup[] {
    if (value) {
      return this.cityGroups
        .map(group => ({
          letter: group.letter,
          names: _filter(group.names, value)
        }))
        .filter(group => group.names.length > 0);
    }

    return this.cityGroups;
  }

  onFileSelected(file: FileList) {
    this.selectedFile = file.item(0); // get first image
    //this.arrayImages.push(this.selectedFile);

    //show image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      //console.log("imageUrl2: ", this.imageUrl);
      this.images.push({ image: this.imageUrl });
      this.newImages.push(this.imageUrl);
      //console.log("reader.result: ", reader.result);
    };
    reader.readAsDataURL(this.selectedFile);

    //console.log("images: ", this.images);
  }

  deleteImage(image) {
    //console.log("image: ", image);
    this.images.splice(this.images.indexOf(image), 1);

    //console.log("Images: ", this.images);
    //console.log("Image: ", image);
    //console.log("Image id: ", image.id);
    this.deletedImages.push(image.id);
    //console.log("this.deletedImages: ", this.deletedImages);
  }

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get("id");
    this.submitted = true;

    if (this.postsForm.invalid) {
      return;
    }

    this.post = this.postsForm.value;
    this.post.id = id;
    this.post.images = this.newImages;
    this.post.deletedImages = this.deletedImages;
    //console.log(this.post);

    this.save();
  }

  private save() {
    //this.postService.addPost(this.post).subscribe();
    this.postService.updatePost(this.post).subscribe(() => {
      this.router.navigate(["/user-posts"]);
    });
  }

  get status() {
    return this.postsForm.get("status");
  }

  get title() {
    return this.postsForm.get("title");
  }

  get description() {
    return this.postsForm.get("description");
  }

  get bills_included() {
    return this.postsForm.get("bills_included");
  }

  get country() {
    return this.postsForm.get("country");
  }

  get city() {
    return this.postsForm.get("city");
  }

  get address() {
    return this.postsForm.get("address");
  }

  get price() {
    return this.postsForm.get("price");
  }

  get squares() {
    return this.postsForm.get("countsquaresry");
  }

  get type() {
    return this.postsForm.get("type");
  }

  get available_date() {
    return this.postsForm.get("available_date");
  }

  get walkout_date() {
    return this.postsForm.get("walkout_date");
  }

  get furnished() {
    return this.postsForm.get("furnished");
  }

  get bed() {
    return this.postsForm.get("bed");
  }

  get room() {
    return this.postsForm.get("room");
  }

  get pet() {
    return this.postsForm.get("pet");
  }

  get parking() {
    return this.postsForm.get("parking");
  }
}
