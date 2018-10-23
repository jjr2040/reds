import { Role } from './role';

export class User {
  id: number;
  email: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: Role[];

  constructor(email: string, roles: Role[] = []) {
    this.email = email;
    this.roles = roles;
  }

  toApiRequestObject(): any {
    const apiRequestObject: any = {
      email: this.email,
      enabled: this.enabled,
      user_roles_attributes: this.roles.map((role) => role.toApiRequestObject())
    };

    return apiRequestObject;
  }
}
