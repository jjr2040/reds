import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { ArtifactService } from '../../services/artifact.service';
import { Router } from '@angular/router';


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

  constructor(private router: Router, private artifactService: ArtifactService) { }

  ngOnInit() {
  }

  fileEvent(fileInput: any) {
    const fileAWS = fileInput.target.files[0];
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
    this.artifactService.createArtifact({
      name: this.name,
      description: this.description,
      created_by: this.created_by,
      file: this.file,
      preview: this.preview
    }).subscribe( response => {
      if (response) {
        this.router.navigate(['/resources']);
      }
    });
  }

}
