import { Component, OnInit } from '@angular/core';
import { GeofenceService } from '../../service/geofence.service';
import {Geofence} from '../../models/geofence-interface';

import { Observable } from 'rxjs';
import { Notification } from '../../models/notification-interface';
import { NotificationService } from '../../service/notification.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.component.html',
  styleUrls: ['./geofence.component.scss']
})
export class GeofenceComponent implements OnInit {
  geofence: Geofence = {
    geoname: '',
    latitudes: '',
    longitudes: '',
    radius: '',
  };
  geofenceInterface = {} as Geofence;
  geofenceRef: AngularFireList<any>;
  geofences: Geofence[];
  lat: number;
  lng: number;
  constructor(private geoService: GeofenceService, public database: AngularFireDatabase) {
    this.geofenceRef = this.database.list('geofences');
  }

  ngOnInit() {
    this.getUserLocation();
    this.geoService.getFences().subscribe(geofences => {
// console.log(geofences);
        this.geofences = geofences;
    });
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
  addFence(geofenceInterface: Notification) {
    // console.log(customerInterface);
    this.geofenceRef.push({
      geoname: this.geofenceInterface.geoname,
      latitudes: this.geofenceInterface.latitudes,
      longitudes: this.geofenceInterface.longitudes,
      radius: this.geofenceInterface.radius,
      type: this.geofenceInterface.type,
    });
  }
  onSubmit() {
    if (this.geofence.geoname !== '') {
      this.geoService.addGeofence(this.geofence);
    }
  }
  deleteGeo(event, geofence) {
    this.geoService.deleteGeo(geofence);
  }
}
