import { Component, OnInit } from '@angular/core';
import { Rooms } from '../models/rooms-interface';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude: number;
  longitute: number;
  lat: number;
  lng: number;
  customerLoc;
  rooms = {} as Rooms;
  constructor(public db: AngularFireDatabase) { }

  ngOnInit() {

    this.rooms = {} as Rooms;
    // this.latitude = -6.914744;
    // this.longitute = 107.609810;

    // dont touch
    this.getUserLocation();
    this.getCustomer();
  }
  getUserLocation() {
    /// Locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
  getCustomer() {
    this.db.list('customers/').valueChanges().subscribe(
      data => {
        // console.log(data);
        this.customerLoc = data;
        console.log(this.customerLoc);
      }
    );
  }

}
