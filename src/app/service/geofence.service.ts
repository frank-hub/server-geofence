import { Injectable } from '@angular/core';
import { Geofence } from '../models/geofence-interface';
import { AngularFirestore , AngularFirestoreCollection , AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GeofenceService {
  itemsCollection: AngularFirestoreCollection<Geofence>;
  geofences: Observable<Geofence[]>;
  geoDoc: AngularFirestoreDocument<Geofence>;
  constructor(public afs: AngularFirestore, public afd: AngularFireDatabase) {
    this.geofences = this.afd.list('geofence').valueChanges();
    // pipe(map(data => data * 2))
    this.itemsCollection = this.afs.collection('geofence', ref => ref.orderBy('id', 'asc'));
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
  deleteGeo(geofence: Geofence) {
this.geoDoc = this.afs.doc(`geofence/${geofence.id}`);
this.geoDoc.delete();
  }
}
