import React from 'react'
import { Auth, Typography, Button } from '@supabase/ui'
import { supabaseClient } from '~/utils/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

type Props = {
  context: {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
  }
}

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

export default function AuthBasic({ context }: Props) {
  const supabase = supabaseClient({
    url: context.SUPABASE_URL,
    key: context.SUPABASE_ANON_KEY,
  })

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth
          onlyThirdPartyProviders={true}
          supabaseClient={supabase}
          providers={['github']}
        />
      </Container>
    </Auth.UserContextProvider>
  )
}
