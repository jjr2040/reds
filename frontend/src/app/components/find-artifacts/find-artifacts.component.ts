import { Component, OnInit } from '@angular/core';
import { ArtifactService } from '../../services/artifact.service';
import { ResourceService } from '../../services/resource.service';
import { MessageService } from '../../services/message.service';
import { differenceBy } from 'lodash';
@Component({
  selector: 'app-find-artifacts',
  templateUrl: './find-artifacts.component.html',
  styleUrls: ['./find-artifacts.component.css']
})
export class FindArtifactsComponent implements OnInit {
  artifacts = [];
  buscar;
  resource;
  buscarNombre;
  buscarDescripcion;
  buscarTags;

  constructor(private artifactsService: ArtifactService, private resourceService: ResourceService, private messageService: MessageService) {
    this.resource = this.resourceService.getCurrentResource();
    this.artifactsService.getArtifacts().subscribe( response => {
      if (response) {
        this.artifacts = differenceBy(response, this.resource.artifacts, 'id');
      }
    });
  }

  ngOnInit() {
  }

  asign(artifact_id) {
    this.artifactsService.asignArtifact(artifact_id, this.resource.id).subscribe( response => {
      console.log(response);
      this.artifacts = differenceBy(this.artifacts, [{id: response['artefacto_id']}], 'id');
      this.messageService.showSuccess('Ok', 'El artefacto ha sido asignado al recurso actual');
    });
  }
}
