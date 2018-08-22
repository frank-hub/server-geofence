import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/staff-interface';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffInterface = {} as Staff;
  staffList: AngularFireList<any>;
  constructor(public db: AngularFireDatabase) {
    this.staffList = this.db.list('staffs');
  }

  ngOnInit() {
  }
  addStaff(staffInterface: Staff) {
    this.staffList.push({
      first_name: this.staffInterface.first_name,
      second_name: this.staffInterface.second_name,
      email: this.staffInterface.email,
      password: this.staffInterface.password,
    });
  }
}
