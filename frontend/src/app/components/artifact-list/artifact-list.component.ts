import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ArtifactService } from './../../services/artifact.service';
import { Artifact } from '../../models/artifact';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit, OnChanges {
  @Input() artifactsIds;
  artifacts: Artifact[];
  users;
  constructor(private artifactService: ArtifactService, private userService: UserService) {
    this.artifacts = [];
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.artifactsIds) {
      this.artifactsIds.forEach( (artifactId, index) => {
        this.artifactService.getArtifact(artifactId).subscribe( element => {
          this.userService.getUser(element.created_by).subscribe( user => {
            this.artifacts[index].created_by_name = user.username;
          });
          this.artifacts[index] = element;
        });
      });
    }
  }

}
