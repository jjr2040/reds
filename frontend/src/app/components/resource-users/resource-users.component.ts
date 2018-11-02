import { Component, OnInit } from '@angular/core';
import { Resource } from './../../models/resource';
import { User } from './../../models/user';
import { ResourceService } from './../../services/resource.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-resource-users',
  templateUrl: './resource-users.component.html',
  styleUrls: ['./resource-users.component.css']
})
export class ResourceUsersComponent implements OnInit {

  resources: Resource[];
  u: User[];
  users: string[];

  constructor(private resourceService: ResourceService,private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
    this.getResources();
  }

  getResources(): void {
    this.resourceService.getResources()
    .subscribe( resources => this.resources = resources);
  }

  addUser(resource, newUser): void { 
    resource.users.push(newUser.trim());
    this.resourceService.updateResource(resource)
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
