import { Component, OnInit } from '@angular/core';
import { WorkplanActivity } from './../../models/workplan-activity';
import { WorkplanActivityService } from './../../services/workplan-activity.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  activities: WorkplanActivity[];

  selectedActivity: WorkplanActivity;
  constructor(private activityService: WorkplanActivityService) {
  }

  ngOnInit() {
    this.activityService.getWorkplanActivities().subscribe( activities => {
      this.activities = activities;
    });
  }

}
