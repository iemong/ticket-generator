import React from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { createClient } from '@supabase/supabase-js'

type Ticket = {
  id: number
  name: string
  key: string
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.name,
    'og:image': `https://text-pict.vercel.app/${data.name}`,
  }
}

export const loader: LoaderFunction = async ({ params, context }) => {
  const supabase = createClient(
    context.SUPABASE_URL ?? '',
    context.SUPABASE_ANON_KEY ?? '',
    {
      fetch: (...args) => fetch(...args),
    }
  )
  const { data } = await supabase
    .from<Ticket>('ticket')
    .select('id, name, key')
    .filter('key', 'eq', params.detail)
    .single()

  return data
}

const TicketDetail: React.VFC = () => {
  const detail = useLoaderData()
  return (
    <div>
      <h1>{JSON.stringify(detail)}</h1>
    </div>
  )
}

export default TicketDetail
