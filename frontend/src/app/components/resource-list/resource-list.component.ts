import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  resources: Resource[];

  constructor(private resourceService: ResourceService, private router: Router) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe( resources => this.resources = resources);
  }

  goTo(id) {
    this.router.navigate([`/resource/${id}`]);
  }
}
