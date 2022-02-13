import { LoaderFunction, useLoaderData } from 'remix'
import { createClient } from '@supabase/supabase-js'

type Ticket = {
  title: string
}

export const loader: LoaderFunction = async ({ context }) => {
  const supabase = createClient(
    context.SUPABASE_URL ?? '',
    context.SUPABASE_ANON_KEY ?? '',
    {
      fetch: (...args) => fetch(...args),
    }
  )
  const { data } = await supabase.from<Ticket>('ticket').select()
  return data
}

export default function Index() {
  const tickets = useLoaderData<Ticket[]>()

  console.log(tickets)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {tickets.map((t, i) => (
          <li className={'w-[500px]'} key={i}>{JSON.stringify(t)}</li>
        ))}
      </ul>
    </div>
  )
}
