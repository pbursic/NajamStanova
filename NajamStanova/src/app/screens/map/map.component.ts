import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude = 44.869331;
  longitude = 13.848558;

  constructor() { }

  ngOnInit() {
  }

}
