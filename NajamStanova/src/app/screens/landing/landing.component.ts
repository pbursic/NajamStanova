import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpParams } from "@angular/common/http";
import { StatsService } from "../../services/stats/stats.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
  providers: [StatsService]
})
export class LandingComponent implements OnInit {
  searchForm: FormGroup;
  avgPrice: string;

  constructor(private statsService: StatsService, private fb: FormBuilder) {}

  ngOnInit() {
    this.statsService.getAvgStats().subscribe(stats => {
      this.avgPrice =
        parseFloat(stats[0].avg_price)
          .toFixed(2)
          .replace(".", ",")
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " kn";
    });

    this.searchForm = this.fb.group({
      city: ["Pula"]
    });
  }

  search() {
    let city = this.searchForm.value.city,
      params = new HttpParams(),
      href = window.location.href;
    if (city != null && city != "") {
      params = params.set("city", this.searchForm.value.city);
    }
    if (params.keys().length != 0) {
      window.location.href = href + "view?" + params;
    }
  }
}
