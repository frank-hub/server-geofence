import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification-interface';
import { NotificationService } from '../../service/notification.service';
import { Geofence } from '../../models/geofence-interface';
import { GeofenceService } from '../../service/geofence.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: Notification = {
    id: '',
    title: '',
    message: '',
  };
  fence: Geofence = {
    geoname: '',
    latitudes: '',
  };
  notifications: Notification[];
  fences: Geofence[];
  customerRef: AngularFireList<any>;
  customerInterface = {} as Notification;
  constructor(public notiService: NotificationService, private geoService: GeofenceService, public database: AngularFireDatabase) {
    this.customerRef = this.database.list('notifications');

   }

  ngOnInit() {
    this.geoService.getFences().subscribe(geofences => {
      // console.log(geofences);
      this.fences = geofences;
    });

    this.notiService.getNotification().subscribe(notifications => {
    this.notifications = notifications;
      console.log(notifications);
    });

  }
  addNotif(customerInterface: Notification) {
    // console.log(customerInterface);
    this.customerRef.push({
      title: this.customerInterface.title,
      message: this.customerInterface.message,
    });
  }
  onSubmit() {
    if (this.notification.title !== '') {
      this.notiService.addNotif(this.notification);
    }
  }
}
