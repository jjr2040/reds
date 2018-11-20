import { Component, OnInit } from '@angular/core';
import { Resource } from './../../models/resource';
import { User } from './../../models/user';
import { Phase } from './../../models/phase';
import { ResourceService } from './../../services/resource.service';
import { UserService } from './../../services/user.service';
import { PhaseService } from './../../services/phase.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-resource-users',
  templateUrl: './resource-users.component.html',
  styleUrls: ['./resource-users.component.css']
})
export class ResourceUsersComponent implements OnInit {

  resource: Resource;
  phases: Phase[];
  users: User[];
  usernames: string[];
  newUser = new FormControl('');
  resUser: User;
  results: Array<User> = [];
  selectedPhase: number;
  showDropDown = false;
  validUser = true;
  validPhase = true;
  resultsCursor = 0;

  constructor(private resourceService: ResourceService,private userService: UserService,private route: ActivatedRoute,
  private phaseService: PhaseService) {}

  ngOnInit() {
    this.getResource();
    this.getPhases();
    this.getUsers();
  }

  getPhases(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResourcePhases(id)
    .subscribe( phases => this.phases = phases);
  }

  getResource(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResource(id)
    .subscribe( resource => this.resource = resource);
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe( users => {
      let usernames = [];
      for(let user of users){
        usernames.push(user.username);
      }
      this.users = users;
      this.usernames = usernames;
    })
  }

  setUser(user): void {
    this.newUser.setValue(user);
    this.showDropDown = !this.showDropDown;
  }

  addUserToPhase(): void {
    const phase = this.phases[this.selectedPhase];
    if(!phase.users.includes(this.newUser.value)){
      phase.users.push(this.newUser.value);
      this.phaseService.updatePhase(phase)
      .subscribe(updatedPhase => {
        console.log("OK");
      });
    }
    this.newUser.setValue('');
  }

  checkPhase(): void {
    if(this.selectedPhase !== undefined){
      this.validPhase = true;
      this.addUserToPhase();
    } else {
      this.validPhase = false;
    }
  }

  checkUser(): void {
    if(this.newUser.value !== '' && this.usernames.includes(this.newUser.value)){
      this.validUser = true;
      this.checkPhase();
    } else {
      this.validUser = false;
    }
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  getResults() {
    let matches = [];
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].username.toLowerCase().indexOf(this.newUser.value.toLowerCase() ) != -1 ){
        matches.push(this.users[i]);
      }
    }
    return matches;
  }

  setResults() {
    if(this.newUser.value.length > 0){
      this.results = this.getResults();
    }
  }

  onKey(event: KeyboardEvent) { // with type info
    console.log(event.code);
    if(event.code == 'arrowDown'){
      console.log("ARROW DOWN");
    }
    if(event.code == 'arrowUp'){
      console.log("ARROW UP");
    }
    //this.values += (<HTMLInputElement>event.target).value + ' | ';
  }

}
