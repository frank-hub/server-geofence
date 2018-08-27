import { Component, OnInit } from '@angular/core';
import { GeofenceService } from '../../service/geofence.service';
import {Geofence} from '../../models/geofence-interface';
import { AlertsService } from 'angular-alert-module';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class GeofenceComponent implements OnInit {
  geofenceInterface = {} as Geofence;
  geofenceList: AngularFireList<any>;
  geofence;
  lat: number;
  lng: number;
  constructor(public database: AngularFireDatabase, private alerts: AlertsService) {
    this.geofenceList = this.database.list('geofences');
  }
  ngOnInit() {
    this.getUserLocation();
    this.getFences();
//     this.geoService.getFences().subscribe(geofences => {
// // console.log(geofences);
//         this.geofences = geofences;
//     });
  }
  getUserLocation() {
    /// Locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // this.geofence.latitudes = this.lat;
        // this.geofence.longitudes = this.lng;
      });
    }
  }
  addGeofence(geofenceInterface: Geofence) {
    this.geofenceList.push({
      geoname: this.geofenceInterface.geoname,
      latitudes: this.lat,
      longitudes: this.lng,
      radius: this.geofenceInterface.radius,
      type: this.geofenceInterface.type,
    });
    this.alerts.setMessage('Geofence saved successfully!', 'success');
  }
  getFences() {
    this.database.list('geofences/').valueChanges().subscribe(
      data => {
        console.log(data);
        this.geofence = data;
      }
    );
  }

  // addFence(geofenceInterface: Notification) {
  //   // console.log(customerInterface);
  //   this.geofenceRef.push({
  //     geoname: this.geofenceInterface.geoname,
  //     latitudes: this.geofenceInterface.latitudes,
  //     longitudes: this.geofenceInterface.longitudes,
  //     radius: this.geofenceInterface.radius,
  //     type: this.geofenceInterface.type,
  //   });
  // }
  // onSubmit() {
  //   if (this.geofence.geoname !== '') {
  //     this.geoService.addGeofence(this.geofence);
  //   }
  // }
  // deleteGeo(event, geofence) {
  //   this.geoService.deleteGeo(geofence);
  // }
}
