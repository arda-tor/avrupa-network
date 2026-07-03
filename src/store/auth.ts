import { CurrentUser } from '@/types/auth'
import { create } from 'zustand'

type AuthState = {
  user: CurrentUser | null
  loading: boolean
  linkedInPrompt: boolean
  setLoading: (value: boolean) => void
  setUserState: (userData: CurrentUser) => void
  setLinkedInPrompt: (value: boolean) => void
  logout: () => void
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  loading: true,
  linkedInPrompt: false,
  setLoading: (value: boolean) => set({ loading: value }),
  setUserState: (userData: CurrentUser) => set({ user: userData }),
  setLinkedInPrompt: (value: boolean) => set({ linkedInPrompt: value }),
  logout: () => set({ user: null, linkedInPrompt: false }),
}))
