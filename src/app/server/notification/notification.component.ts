import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification-interface';
import { GeofenceService } from '../../service/geofence.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AlertsService } from 'angular-alert-module';

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
  notifications: Notification[];
  customerRef: AngularFireList<any>;
  customerInterface = {} as Notification;
  the_fences;
  constructor(private alerts: AlertsService, public database: AngularFireDatabase) {
    this.customerRef = this.database.list('notifications');

   }

  ngOnInit() {
    this.getFences();
    this.alerts.setMessage('All the fields are required', 'error');
    this.alerts.setMessage('Please save all the changes before closing', 'warn');
  }
  addNotif(customerInterface: Notification) {
    // console.log(customerInterface);
    this.customerRef.push({
      the_fence: this.customerInterface.the_fence,
      title: this.customerInterface.title,
      message: this.customerInterface.message,
    });

    this.alerts.setMessage('Notifications saved successfully!', 'success');
  }
  getFences() {
    this.database.list('geofences/').valueChanges().subscribe(
      data => {
        console.log(data);
        this.the_fences = data;
        console.log(this.the_fences);
      }
    );
  }
}
