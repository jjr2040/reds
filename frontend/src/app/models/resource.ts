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

    // get priorityDisplay(): string {
    //     switch (this.priority) {
    //         case 1: return 'Baja';
    //         case 2: return 'Media';
    //         case 3: return 'Alta';
    //         default: return '';
    //     }
    // }

    // get currentPhaseDisplay(): string {

    //     switch (this.current_phase) {
    //         case 1: return 'Preproducción';
    //         case 2: return 'Producción';
    //         case 3: return 'Postproducción';
    //         case 4: return 'Controler de calidad';
    //         default: return '';
    //     }
    // }
}
