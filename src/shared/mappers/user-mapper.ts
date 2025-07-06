import type { User } from '@/types/user';

export interface ApiUserResponse {
  user_id: string;
  email_address: string;
  full_name: string;
  profile_image_url: string | null;
  user_role: string;
  created_timestamp: string;
  updated_timestamp: string;
  is_active: boolean;
}

export interface CreateUserRequest {
  email_address: string;
  full_name: string;
  user_role: string;
  profile_image_url?: string;
}

// Helper functions
const mapUserRole = (apiRole: string): 'admin' | 'user' => {
  return apiRole.toLowerCase() === 'admin' ? 'admin' : 'user';
};

const mapTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toISOString();
};

// Core mapping functions
export const mapApiUserToUser = (apiUser: ApiUserResponse): User => ({
  id: apiUser.user_id,
  email: apiUser.email_address,
  name: apiUser.full_name,
  role: mapUserRole(apiUser.user_role),
  createdAt: mapTimestamp(apiUser.created_timestamp),
  updatedAt: mapTimestamp(apiUser.updated_timestamp),
});

// Structured mapper object
export const userMapper = {
  toTarget: mapApiUserToUser,
};
