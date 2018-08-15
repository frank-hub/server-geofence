import { Injectable } from '@angular/core';
import { Notification } from '../models/notification-interface';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
notificationCollection: AngularFirestoreCollection<Notification>;
notification: Observable<Notification[]>;
notifDoc: AngularFirestoreDocument<Notification>;
constructor(public afs: AngularFirestore, public afd: AngularFireDatabase) {
    this.notification = this.afs.collection('notifications').valueChanges();
  this.notificationCollection = this.afs.collection('geofence', ref => ref.orderBy('id', 'asc'));
    // this.notificationCollection = this.af.collection('notifications', ref => ref.orderBy('id', 'asc'));
    // this.notification = this.notificationCollection.snapshotChanges().map(changes => {
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as Notification;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });
   }
   getNotification() {
    return this.notification;
   }
  addNotif(notifications: Notification) {
    // this.notificationCollection.add(notifications);
    // console.log(notifications);
    this.notificationCollection.add(notifications);
  }
}
