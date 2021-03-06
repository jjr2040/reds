import { Resource } from './../../models/resource';
import { ResourceService } from './../../services/resource.service';
import { Project } from './../../models/project';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PhaseService } from './../../services/phase.service';
import { Phase } from './../../models/phase';

@Component({
  selector: 'app-resources-create',
  templateUrl: './resources-create.component.html',
  styleUrls: ['./resources-create.component.css']
})
export class ResourcesCreateComponent implements OnInit {

  resourceForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
    priority: ['', Validators.required],
    estimated_duration: ['', Validators.required],
    current_phase: [1, Validators.required],
    project_id: ['', Validators.required],
    tags: ['']
  });

  projects: Project[];

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private router: Router,
    private phaseService: PhaseService
  ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe( projects => this.projects = projects);
  }

  saveResource(): void {
    console.warn(this.resourceForm.value);
    const resource: Resource = this.resourceForm.value;
    resource.tags = (this.resourceForm.get('tags').value as string).split(',');
    this.resourceService.createResource(resource).subscribe( createdResource => {
      for(let i = 1; i <= 4; i++){
        this.addPhase(i,createdResource);
      }
      console.log('Created a resource');
      this.router.navigate(['/resources', createdResource.id]);
    });
  }

  addPhase(phaseName,createdResource): void {
    let newPhase: Phase = {
    name : phaseName,
    resource : createdResource.id,
    users: []
  }
  this.phaseService.createPhase(newPhase).subscribe( createdPhase=> {
    console.log('New phase created' + createdPhase);
  });
  
  }

}
