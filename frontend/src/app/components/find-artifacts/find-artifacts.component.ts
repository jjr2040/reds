import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';
import { ResourceService } from '../../services/resource.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-find-artifacts',
  templateUrl: './find-artifacts.component.html',
  styleUrls: ['./find-artifacts.component.css']
})
export class FindArtifactsComponent implements OnInit {
  artifacts = [];
  buscar;
  resource;

  constructor(private artifactsService: ArtifactService, private resourceService: ResourceService, private messageService: MessageService) {
    this.resource = this.resourceService.getCurrentResource();
    this.artifactsService.getArtifacts().subscribe( response => {
      if (response) {
        response.forEach(artifact => {
          if (artifact.resource_id !== this.resource.id) {
            this.artifacts.push(artifact);
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  asign(artifact_id) {
    this.artifactsService.asignArtifact(artifact_id, this.resource.id).subscribe( response => {
      this.messageService.showSuccess('Ok', 'El artefacto ha sido asignado al recurso actual');
    });
  }
}
