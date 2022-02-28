import { atom } from 'recoil'
import { User } from '@supabase/gotrue-js'

export type Auth = {
  user: User | null
  isLoggedIn: boolean
}

export const authState = atom<Auth>({
  key: 'auth',
  default: {
    user: null,
    isLoggedIn: false,
  },
})
