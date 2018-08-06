import { Component, OnInit } from '@angular/core';
import { GeofenceService } from '../../service/geofence.service';
import {Geofence} from '../../models/geofence-interface';
import { Observable } from 'rxjs';

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
  geofences: Geofence[];
  lat: string;
  lng: string;
  constructor(private geoService: GeofenceService ) { }

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
        this.geofence.latitudes = this.lat;
        this.geofence.longitudes = this.lng;
      });
    }
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
