import { Component, OnInit } from '@angular/core';
import { WorkplanActivity } from '../../models/WorkplanActivity';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  activities: WorkplanActivity[];

  selectedActivity: WorkplanActivity;
  constructor() { }

  ngOnInit() {
  }

}
