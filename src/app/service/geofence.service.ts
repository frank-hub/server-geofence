import { Injectable } from '@angular/core';
import { Geofence } from '../models/geofence-interface';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  itemsCollection: AngularFirestoreCollection<Geofence>;
  geofences: Observable<Geofence[]>;
  constructor(public afs: AngularFirestore, public afd: AngularFireDatabase) {

    this.itemsCollection = this.afs.collection('geofence', ref => ref.orderBy('radius', 'asc'));
    // this.geofences = this.afs.collection('geofence').valueChanges();
    // pipe(map(data => data * 2))
    this.geofences = this.itemsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Geofence;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }
  getFences() {
    return this.geofences;
  }
  addGeofence(geofence: Geofence) {
this.itemsCollection.add(geofence);
  }
}
