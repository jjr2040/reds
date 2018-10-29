import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

  resources: Resource[];

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe( resources => this.resources = resources);
  }

}
