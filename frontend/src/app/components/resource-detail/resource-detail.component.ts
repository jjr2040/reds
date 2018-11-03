import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  resource: Resource;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getResource();
  }

  getResource(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResource(id).subscribe( resource => this.resource = resource);
  }

  addArtifact(id, credential) {
    this.router.navigate([`/resource/${id}/artifacts/create`]);
  }
}
