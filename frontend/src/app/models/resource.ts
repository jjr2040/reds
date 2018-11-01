import { Project } from './project';

export class Resource {
    id: Number;
    name: string;
    type: string;
    priority: Number;
    estimated_duration: Number;
    description: string;
    created_at: Date;
    updated_at: Date;
    current_phase: string;
    project: Project;
    users: string[];
}
