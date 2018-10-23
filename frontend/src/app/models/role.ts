export class Role {
  id: number;
  userId: number;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(role: string) {
    this.role = role;
  }

  toApiRequestObject(): any {
    const apiRequestObject: any = {
      role: this.role
    };
    return apiRequestObject;
  }
}
