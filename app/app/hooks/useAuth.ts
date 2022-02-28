import { useCallback, useContext, useEffect } from 'react'
import { SupabaseContext } from '~/root'
import { useToast } from '~/hooks/useToast'
import { useRecoilState } from 'recoil'
import { Auth, authState } from '~/recoil/atoms/Auth'

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState<Auth>(authState)
  const supabaseClient = useContext(SupabaseContext)
  const [toast] = useToast()

  useEffect(() => {
    if (!supabaseClient) return
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setAuth({
        user: session?.user ?? null,
        isLoggedIn: !!session?.user,
      })
      console.log(_event, session)
    })

    const user = supabaseClient.auth.user()
    setAuth({
      user: user ?? null,
      isLoggedIn: !!user,
    })
  }, [])

  const handleSignInViaGithub = useCallback(async () => {
    if (!supabaseClient) return
    const { error } = await supabaseClient.auth.signIn({
      provider: 'github',
    })
    if (error) {
      toast({ message: error?.message || '', type: 'error' })
    }
  }, [supabaseClient])

  const handleSignOut = useCallback(async () => {
    if (!supabaseClient) return
    const { error } = await supabaseClient.auth.signOut()

    setAuth({
      user: null,
      isLoggedIn: false,
    })

    if (error) {
      toast({ message: error?.message || '', type: 'error' })
    }
  }, [supabaseClient])

  return {
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
    handleSignInViaGithub,
    handleSignOut,
  }
}
