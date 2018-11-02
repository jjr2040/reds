import { Router, ActivatedRoute } from '@angular/router';
import { ResourceService } from './../../services/resource.service';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../../models/resource';

@Component({
  selector: 'app-resources-edit',
  templateUrl: './resources-edit.component.html',
  styleUrls: ['./resources-edit.component.css']
})
export class ResourcesEditComponent implements OnInit {

  resource: Resource;
  projects: Project[];

  resourceForm;

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder,
    private resourceService: ResourceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getResource();
    this.getProjects();
  }

  getResource() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.resourceService.getResource(id).subscribe( resource => {
      this.resource = resource;
      this.resourceForm = this.fb.group({
        name: [this.resource.name, Validators.required],
        description: [this.resource.description, Validators.required],
        type: [this.resource.type, Validators.required],
        priority: [this.resource.priority, Validators.required],
        estimated_duration: [this.resource.estimated_duration, Validators.required],
        current_phase: [this.resource.current_phase, Validators.required],
        project_id: [this.resource.project.id, Validators.required],
        tags: [this.resource.tags.join(',')]
      });
    });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe( projects => this.projects = projects);
  }

  saveResource(): void {
    console.warn(this.resourceForm.value);
    const resource: Resource = this.resourceForm.value;
    resource.tags = (this.resourceForm.get('tags').value as string).split(',');
    resource.id = this.resource.id;

    this.resourceService.updateResource(resource).subscribe( createdResource => {
      console.log('Created a resource');
      this.router.navigate(['/resources', createdResource.id]);
    });
  }

}
