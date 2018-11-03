import { FormBuilder, FormGroup } from '@angular/forms';
import { WorkplanActivity } from './../../models/workplan-activity';
import { ResourceService } from './../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { Resource } from '../../models/resource';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {

  activity: WorkplanActivity;
  resources: Resource[];

  activityForm: FormGroup = this.fb.group({
    name: [''],
    start_date: [''],
    end_date: [''],
    duration: [0],
    periodicity: [3],
    status: [1],
    progress: [0],
    resource: ['']
  });

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getResources();
    if (!this.isNew) {
      this.getActivity();
    }
  }

  getActivity() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.activityService.getActivity(id).subscribe( activity => {
      this.activity = activity;
      this.activityForm = this.fb.group({
        name: [this.activity.name],
        start_date: [this.activity.start_date],
        end_date: [this.activity.end_date],
        duration: [this.activity.duration],
        periodicity: [this.activity.periodicity],
        status: [this.activity.status],
        progress: [this.activity.progress],
        resource: [this.activity.resource]
      });
    });
  }

  getResources() {
    this.resourceService.getResources().subscribe( resources => this.resources = resources);
  }

  saveActivity() {
    if (this.isNew) {
      const activity: WorkplanActivity = this.activityForm.value;

      this.activityService.createActivity(activity).subscribe( updatedActivity => {
        console.log('activity created');
        this.router.navigate(['/activities']);
      });
    } else {
      const activity: WorkplanActivity = this.activityForm.value;
      activity.id = this.activity.id;

      this.activityService.updateActivity(activity).subscribe( updatedActivity => {
        console.log('updated activity');
        this.router.navigate(['/activities']);
      });
    }
  }

  get isNew(): boolean {
    return !this.route.snapshot.paramMap.has('id');
  }

  get actionName(): string {
    return this.isNew ? 'Crear' : 'Editar';
  }
}
