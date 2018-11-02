import { User } from './user';

export class Artifact {
    id?: Number;
    name: String;
    description: String;
    creared_at?: Date;
    updated_at?: Date;
    file: String;
    created_by: User;
    tags?: String[];
    preview: Boolean;
}
