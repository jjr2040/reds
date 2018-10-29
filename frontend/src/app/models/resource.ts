import { Project } from './project';

export class Resource {
    id: String;
    name: String;
    type: String;
    priority: Number;
    estimated_duration: Number;
    description: String;
    creared_at: Date;
    updated_at: Date;
    current_phase: Number;
    project: Project;
}
