import { createZustandMMKVStorage } from '@/services/storage/zustandStorage';
import type { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  setAuth: (payload: {
    user: User;
    token: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      refreshToken: null,
      isLoggedIn: false,
      setAuth: ({ user, token, refreshToken }) =>
        set(() => ({
          user,
          token,
          refreshToken,
          isLoggedIn: true,
        })),
      logout: () =>
        set(() => ({
          user: null,
          token: null,
          refreshToken: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: 'auth-storage',
      storage: createZustandMMKVStorage(),
      partialize: state => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);
