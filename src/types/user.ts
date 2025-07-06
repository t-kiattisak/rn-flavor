export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin' | 'staff';
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
