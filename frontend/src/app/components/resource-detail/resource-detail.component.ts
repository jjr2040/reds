import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';
import { ResourceVersionService } from '../../services/resourceVersion.service';
import { ResourceVersion } from '../../models/resourceVersion';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.css']
})
export class ResourceDetailComponent implements OnInit {

  resource: Resource;
  resourceVersions: ResourceVersion[];
  file;
  number;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceVersionService: ResourceVersionService,
    private artifactService: ArtifactService,
    private router: Router
  ) {
    this.getResource();
    this.getResourceVersions();
  }

  ngOnInit() {
  }

  getResource(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResource(id).subscribe( resource => {
      this.resource = resource;
      this.resourceService.setCurrentResource(this.resource);
      this.artifactService.setCredential(this.resource.aws_credential);
    });
  }

  addArtifact(id, name) {
    this.router.navigate([`/resource/${id}/artifacts/create/${name}`]);
  }

  getResourceVersions(): void {
    this.resourceVersions = [];
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceVersionService.getResourceVersions().subscribe( versions => {
      versions.forEach( version => {
        if (version.resource === id) {
          this.resourceVersions.push(version);
          if (version.version_number) {
            this.number = version.version_number;
          } else {
            this.number = 0;
          }
        }
      });
    });
  }

  fileEvent(fileInput: any) {
    const fileAWS = fileInput.target.files[0];
    this.file = fileAWS.name;
    /*const bucket = new S3(
      {
        accessKeyId: this.artifactService.getAWSCredential().split('%')[0],
        secretAccessKey: this.artifactService.getAWSCredential().split('%')[1],
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'agilesreds',
      Key:  fileAWS.name,
      Body: fileAWS
    };
    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      this.file = data.Location;
      console.log('Successfully uploaded file.', data);
      return true;
    });*/
  }

  nuevaVersion() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceVersionService.createResourceVersion({
      version_number: this.number + 1,
      file: this.file,
      resource: id
    }).subscribe( response => {
      console.log(response);
      this.resourceVersions.push(response);
    });
  }

  goToResources() {
    this.resourceService.backToResources();
    this.router.navigate(['/resources']);
  }
}
