import { Component, OnInit, Input } from '@angular/core';
import { ArtifactService } from './../../services/artifact.service';

@Component({
  selector: 'app-artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css']
})
export class ArtifactListComponent implements OnInit {
  @Input() resource: number;
  constructor(private artifactService: ArtifactService) {
    this.artifactService.getArtifact(this.resource).subscribe( response => {
      
    });
  }

  ngOnInit() {
  }

}
