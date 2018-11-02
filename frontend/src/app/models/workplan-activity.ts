export class WorkplanActivity {
    id: number;
    name: String;
    start_date: Date;
    end_date: Date;
    duration: Number;
    periodicity: Number;
    periodicity_display: string;
    status: Number;
    status_display: string;
    progress: Number;
    resource: Number;
    users: string[];
}
