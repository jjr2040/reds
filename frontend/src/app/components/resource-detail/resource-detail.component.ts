import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';

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
    private artifactService: ArtifactService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getResource();
  }

  getResource(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResource(id).subscribe( resource => {
      this.resource = resource;
      this.artifactService.setCredential(this.resource.aws_credential);
    });
  }

  addArtifact(id, name) {
    this.router.navigate([`/resource/${id}/artifacts/create/${name}`]);
  }
}
