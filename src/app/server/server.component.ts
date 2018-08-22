import { Component, OnInit } from '@angular/core';
import { GeofenceService } from '../service/geofence.service';
import { Geofence } from '../models/geofence-interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  dataset: Observable<Geofence[]>;
  geofences: Geofence[];
  customer;
  notification;
  constructor(private geoService: GeofenceService, public database: AngularFireDatabase  ) {
  this.geoService.getFences().subscribe(geofences => {
    // console.log(geofences);
    this.geofences = geofences;
  });
 }
    ngOnInit() {
    // this.geoService.getFences().subscribe(geofences => {
    //   // console.log(geofences);
    //   this.geofences = geofences;
    //   console.log(this.geofences);
    // });
      this.getCustomer();
      this.getNotify();
  }
  getCustomer() {
    this.database.list('customers/').valueChanges().subscribe(
      data => {
        console.log(data);
        this.customer = data;
      }
    );
  }
  getNotify() {
    this.database.list('notifications/').valueChanges().subscribe(
      datas => {
        console.log(datas);
        this.notification = datas;
      }
    );
  }
}
