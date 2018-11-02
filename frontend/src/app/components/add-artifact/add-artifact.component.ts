import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { ArtifactService } from '../../services/artifact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-add-artifact',
  templateUrl: './add-artifact.component.html',
  styleUrls: ['./add-artifact.component.css']
})
export class AddArtifactComponent implements OnInit {
  file;
  tags;
  created_by;
  description;
  name;
  preview;
  users;
  resource_id;
  constructor(private router: Router, private artifactService: ArtifactService, private userService: UserService,
    private route: ActivatedRoute) {
    this.userService.getUsers().subscribe( users => {
      this.users = users;
    });
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resource_id = params['id'];
    });
  }

  fileEvent(fileInput: any) {
    const fileAWS = fileInput.target.files[0];
    this.file = fileAWS.name;
    const bucket = new S3(
      {
        accessKeyId: '',
        secretAccessKey: '',
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
    });
  }

  crearArtifact() {
    console.log(this.created_by);
    this.artifactService.createArtifact({
      name: this.name,
      description: this.description,
      created_by: this.created_by,
      file: this.file,
      preview: this.preview,
      resource_id: this.resource_id,
      tags: this.tags
    }).subscribe( response => {
      if (response) {
        this.router.navigate(['/resources']);
      }
    });
  }

}
