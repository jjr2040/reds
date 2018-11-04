import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { WorkplanActivity } from './../../models/workplan-activity';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  activities: WorkplanActivity[];
  selectedActivity: WorkplanActivity;

  constructor(private activityService: ActivityService, private resourceService: ResourceService) {}

  ngOnInit() {
    this.activityService.getActivities().subscribe( activities => {
      this.activities = activities;
    });
  }

  deleteActivity(activity: WorkplanActivity) {
    this.activityService.deleteActivity(activity).subscribe( () => {
      const index = this.activities.indexOf(activity);
      this.activities.splice(index, 1);
    });
  }
}
