import { Component, OnInit } from '@angular/core';
import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';

@Component({
  selector: 'app-resource-active-list',
  templateUrl: './resource-active-list.component.html',
  styleUrls: ['./resource-active-list.component.css']
})
export class ResourceActiveListComponent implements OnInit {

   resources: Resource[];

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe( resources => {
      this.resources = resources;
    });
  }


}
