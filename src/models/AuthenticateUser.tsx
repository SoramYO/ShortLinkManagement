export interface Role {
  isActive: boolean;
  _id: string;
  name: string;
  permissions: string[];
  limits: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  role: Role;
}
