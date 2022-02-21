import React from 'react'
import { LoaderFunction, useLoaderData } from 'remix'
import { createClient } from '@supabase/supabase-js'
import { Ticket } from '~/types/Tiket'
import Headline from '~/components/Headline'
import TicketCard from '~/components/TicketCard'

export const loader: LoaderFunction = async ({ context }) => {
  const supabase = createClient(
    context.SUPABASE_URL ?? '',
    context.SUPABASE_ANON_KEY ?? '',
    {
      fetch: (...args) => fetch(...args),
    }
  )
  const { data } = await supabase
    .from<Ticket>('ticket')
    .select('name, key, active')
  return data
}

const index: React.VFC = () => {
  const tickets = useLoaderData<Ticket[]>()

  return (
    <main className={'px-[16px] mt-[48px] sm:px-[32px]'}>
      <Headline as="h2" className={'mb-[48px]'}>
        チケット一覧
      </Headline>
      <ul
        className={
          'flex flex-col flex-nowrap gap-[24px] sm:flex-row sm:flex-wrap'
        }
      >
        {tickets.map((ticket) => (
          <li key={ticket.key}>
            <TicketCard
              name={ticket.name}
              isActive={ticket.active}
              ticketKey={ticket.key}
            />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default index
