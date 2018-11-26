import { Component, OnInit } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { ArtifactService } from '../../services/artifact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-artifact',
  templateUrl: './add-artifact.component.html',
  styleUrls: ['./add-artifact.component.css']
})
export class AddArtifactComponent implements OnInit {
  artifactForm: FormGroup;
  submitted;
  users;
  resource_id;
  resourceName;

  constructor(private router: Router, private artifactService: ArtifactService, private userService: UserService,
    private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.userService.getUsers().subscribe( users => {
      this.users = users;
    });
    this.artifactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      preview: [false, [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.submitted = false;
  }

  get f() {
    return this.artifactForm.controls;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resource_id = params['id'];
      this.resourceName = params['name'];
    });
  }

  fileEvent(fileInput: any) {
    const fileAWS = fileInput.target.files[0];
    this.artifactForm.value.file = fileAWS.name;
    const bucket = new S3(
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
    bucket.upload(params,  (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      this.artifactForm.value.file = data.Location;
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  crearArtifact() {
    this.submitted = true;

    if (this.artifactForm.invalid) {
      return;
    }

    this.artifactService.createArtifact({
      name: this.artifactForm.value.name,
      description: this.artifactForm.value.description,
      tags: this.artifactForm.value.tags,
      created_by: this.userService.currentUser.id,
      file: this.artifactForm.value.file,
      preview: this.artifactForm.value.preview,
      resource_id: this.resource_id
    }).subscribe( response => {
      if (response) {
        this.router.navigate(['/resources/' + this.resource_id]);
      }
    });
  }

}
