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
  };
  geofences: Geofence[];
  lat: number;
  lng: number;
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
      });
    }
  }
  onSubmit() {
    if (this.geofence !== '' ) {
      this.geoService.addGeofence(this.geofence);
    }
  }
}
