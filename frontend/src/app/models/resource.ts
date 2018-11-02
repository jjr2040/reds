import { Project } from './project';

export class Resource {

    id: number;
    name: string;
    type: string;
    priority: number;
    estimated_duration: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    current_phase: number;
    project: Project;
    users: string[];
    current_phase_display: string;
    priority_display: string;
    tags: string[];
    artifacts: Number[];
}
