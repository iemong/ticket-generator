import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  useActionData,
  useLoaderData,
} from 'remix'
import { createClient } from '@supabase/supabase-js'

type Ticket = {
  name: string
  key: string
  id: number
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

export const action: ActionFunction = async ({ context }) => {
  const supabase = createClient(
    context.SUPABASE_URL ?? '',
    context.SUPABASE_ANON_KEY ?? '',
    {
      fetch: (...args) => fetch(...args),
    }
  )

  const { data, error } = await supabase
    .from('ticket')
    .insert([{ name: '肩たたき券', user_id: 1 }])

  if (error) {
    return error
  }

  return redirect('/')
}

export default function Index() {
  const tickets = useLoaderData<Ticket[]>()
  const error = useActionData()

  console.log(tickets)
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        {tickets.map((t) => (
          <li className={'w-[500px]'} key={t.key}>
            <Link to={`/tickets/${t.key}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
      <Form method="post">
        {error && <p>{JSON.stringify(error)}</p>}
        <button type="submit">券を作成</button>
      </Form>
    </div>
  )
}
