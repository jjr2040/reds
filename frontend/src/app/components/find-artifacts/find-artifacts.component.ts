import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';

@Component({
  selector: 'app-find-artifacts',
  templateUrl: './find-artifacts.component.html',
  styleUrls: ['./find-artifacts.component.css']
})
export class FindArtifactsComponent implements OnInit {
  artifacts;
  buscar;

  constructor(private artifactsService: ArtifactService) {
    this.artifactsService.getArtifacts().subscribe( response => {
      this.artifacts = response;
    });
  }

  ngOnInit() {
  }

  asign(artifact_id) {
    this.artifactsService.asignArtifact(artifact_id, 3).subscribe( response => {
      console.log(response);
    });
  }
}
