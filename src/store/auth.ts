import { CurrentUser } from '@/types/auth'
import { create } from 'zustand'

type AuthState = {
  user: CurrentUser | null
  loading: boolean
  setLoading: (value: boolean) => void
  setUserState: (userData: CurrentUser) => void
  logout: () => void
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  loading: true,
  setLoading: (value: boolean) => set({ loading: value }),
  setUserState: (userData: CurrentUser) => set({ user: userData }),
  logout: () => set({ user: null }),
}))
