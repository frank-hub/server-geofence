import { Component, OnInit } from '@angular/core';
import { Geofence } from '../models/geofence-interface';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AlertsService } from 'angular-alert-module';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
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
  geofence;
  constructor(public afAuth: AngularFireAuth, private alerts: AlertsService, public database: AngularFireDatabase  ) {
 }
    ngOnInit() {
      this.alerts.setMessage('Welcome To PLMS (Your Marketing Partner)', 'warn');
      this.getCustomer();
      this.getNotify();
      this.getFences();

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
  logout() {
    this.afAuth.auth.signOut();
  }
  getFences() {
    this.database.list('geofences/').valueChanges().subscribe(
      datas => {
        console.log(datas);
        this.geofence = datas;
      }
    );
  }
  loginTemplate() {
  }
}
