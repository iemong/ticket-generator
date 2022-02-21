import React, { useCallback } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { createClient } from '@supabase/supabase-js'
import TicketCardDetail from '~/components/TicketCardDetail'
import { Ticket } from '~/types/Tiket'
import Headline from '~/components/Headline'
import Button from '~/components/Button'
import { HtmlMetaDescriptor } from '@remix-run/server-runtime/routeModules'

const SITE_NAME = 'Ticket Generator'

export const meta: MetaFunction = ({ data }) => {
  const d = data as Ticket
  return {
    title: `${d.name} | ${SITE_NAME}`,
    description: d.description,
    'og:image': `https://text-pict.vercel.app/${d.name}`,
  } as HtmlMetaDescriptor
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
    .select('name, key, active, description')
    .filter('key', 'eq', params.detail)
    .single()

  return data
}

const TicketDetail: React.VFC = () => {
  const detail = useLoaderData<Ticket>()

  const handleTicketUseClick = useCallback(() => {
    console.log('use')
  }, [])

  return (
    <main className={'px-[16px] mt-[48px] sm:px-[32px]'}>
      <Headline as="h2" className={'mb-[48px]'}>
        チケット詳細
      </Headline>
      <div className={'mx-auto max-w-[640px]'}>
        <TicketCardDetail
          ticketKey={detail.key}
          name={detail.name}
          isActive={detail.active}
          description={detail.description}
        />
        <Button
          className={'mt-[60px]'}
          disabled={!detail.active}
          onClick={handleTicketUseClick}
        >
          {detail.active ? '使用する' : '使用済み'}
        </Button>
      </div>
    </main>
  )
}

export default TicketDetail
