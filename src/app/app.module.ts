import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { ServerComponent } from './server/server.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GeofenceComponent } from './server/geofence/geofence.component';
import { NotificationComponent } from './server/notification/notification.component';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { GeofenceService } from './service/geofence.service';
import { StaffComponent } from './staff/staff.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    LoginComponent,
    GeofenceComponent,
    NotificationComponent,
    MapComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'precise-location'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9BrfG0u2ijdH2dToRwvs-P-WSDn3nF0U'
    }),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'server',
        component: ServerComponent
      },
      {
        path: 'geofence',
        component: GeofenceComponent
      },
      {
        path: 'staff',
        component: StaffComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      { path: '**', component: AppComponent }
  ]),
],
  providers: [GeofenceService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
