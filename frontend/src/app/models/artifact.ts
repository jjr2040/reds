import { User } from './user';

export class Artifact {
    id?: Number;
    name: String;
    description: String;
    creared_at?: Date;
    updated_at?: Date;
    file: String;
    created_by: Number;
    created_by_name?: String;
    tags?: String[];
    preview: Boolean;
    resource_id?: Number;
}
