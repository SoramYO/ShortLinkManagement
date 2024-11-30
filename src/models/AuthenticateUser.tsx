type Role = {
  isActive: boolean;
  _id: string;
  name: string;
  permissions: string[];
  limits: any[];
};

type Subscription = {
  status: string;
  autoRenew: boolean;
};

export type BankAccount = {
  _id?: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  apiKey: string;
  balance: number;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLoginAt: string;
  payment: BankAccount[];
  subscription: Subscription;
  phone?: string;
};