import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/staff-interface';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffInterface = {} as Staff;
  staffList: AngularFireList<any>;
  staff;
  constructor(public db: AngularFireDatabase, private alerts: AlertsService) {
    this.staffList = this.db.list('staffs');
  }

  ngOnInit() {
    this.getStaff();
  }
  addStaff(staffInterface: Staff) {
    this.staffList.push({
      first_name: this.staffInterface.first_name,
      second_name: this.staffInterface.second_name,
      email: this.staffInterface.email,
      password: this.staffInterface.password,
    });
    this.alerts.setMessage('Notifications saved successfully!', 'success');
  }
  getStaff() {
    this.db.list('staffs/').valueChanges().subscribe(
      data => {
        this.staff = data;
      }
    );
  }

}
