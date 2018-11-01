import { Component, OnInit, Input } from '@angular/core';
import { ArtifactService } from './../../services/artifact.service';
import { Artifact } from '../../models/artifact';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit, OnChanges {
  @Input() artifactsIds;
  artifacts: Artifact[];
  constructor(private artifactService: ArtifactService) {
    this.artifacts = [];
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.artifactsIds) {
      this.artifactsIds.forEach( (artifactId, index) => {
        this.artifactService.getArtifact(artifactId).subscribe( element => {
          this.artifacts[index] = element;
        });
      });
    }
  }

}
