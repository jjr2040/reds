import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { ActivityService } from './../../services/activity.service';
import { User } from './../../models/user';
import { WorkplanActivity } from './../../models/WorkplanActivity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-users',
  templateUrl: './activity-users.component.html',
  styleUrls: ['./activity-users.component.css']
})
export class ActivityUsersComponent implements OnInit {

  activity: WorkplanActivity;
  users : string[];

  constructor(private userService: UserService, private activityService: ActivityService,private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getUsers();
  	this.getActivity();
  }

  getActivity(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
    this.activityService.getResource(id)
      .subscribe(activity => {
        this.activity = activity;
      });
  }

  addUser(newUser): void {  
    this.activity.users.push(newUser.trim());
    this.activityService.updateResource(this.activity)
      .subscribe();
  }

  validUser(newUser) {
    return this.users.includes(newUser.trim());
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe( users => {
      let unames = [];
      for(let user of users){
        unames.push(user.username);
      }
      this.users = unames;
    }); 
  }

}
