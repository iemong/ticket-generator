import React, { useContext } from 'react'
import { Auth, Typography, Button } from '@supabase/ui'
import { SupabaseClient } from '@supabase/supabase-js'
import { SupabaseContext } from '~/root'

type ContainerProps = {
  supabaseClient: SupabaseClient
  children: JSX.Element
}

const Container = (props: ContainerProps) => {
  const { user } = Auth.useUser()
  if (user)
    return (
      <>
        <Typography.Text>Signed in: {user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    )
  return props.children
}

export default function AuthBasic() {
  const supabaseClient = useContext(SupabaseContext)

  return supabaseClient ? (
    <Auth.UserContextProvider supabaseClient={supabaseClient}>
      <Container supabaseClient={supabaseClient}>
        <Auth
          onlyThirdPartyProviders={true}
          supabaseClient={supabaseClient}
          providers={['github']}
        />
      </Container>
    </Auth.UserContextProvider>
  ) : (
    <></>
  )
}
