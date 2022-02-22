import React, { useCallback } from 'react'
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  useActionData,
  useLoaderData,
} from 'remix'
import TicketCardDetail from '~/components/TicketCardDetail'
import { Ticket } from '~/types/Tiket'
import Headline from '~/components/Headline'
import Button from '~/components/Button'
import { HtmlMetaDescriptor } from '@remix-run/server-runtime/routeModules'
import { supabase } from '~/utils/supabase'
import { DOMAIN_NAME } from '~/utils/const'

const SITE_NAME = 'Ticket Generator'

export const meta: MetaFunction = ({ data, location }) => {
  const d = data as Ticket
  return {
    title: `${d.name} | ${SITE_NAME}`,
    description: d.description,
    'og:title': `${d.name} | ${SITE_NAME}`,
    'og:description': d.description,
    'og:image': `https://text-pict.vercel.app/${decodeURI(d.name)}`,
    'og:url': `${DOMAIN_NAME}${location.pathname}`,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
  } as HtmlMetaDescriptor
}

export const loader: LoaderFunction = async ({ params, context }) => {
  const { data } = await supabase(context)
    .from<Ticket>('ticket')
    .select('name, key, active, description')
    .filter('key', 'eq', params.detail)
    .single()

  return data
}

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData()
  const key = formData.get('key')

  const { error } = await supabase(context)
    .from('ticket')
    .update({ active: false })
    .match({ key })

  if (error) {
    return error
  }
}

const TicketDetail: React.VFC = () => {
  const detail = useLoaderData<Ticket>()
  const error = useActionData()

  return (
    <main className={'px-[16px] pb-[60px] mt-[48px] sm:px-[32px]'}>
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
        <Form method="post">
          {error && <p>{JSON.stringify(error)}</p>}
          <input type="hidden" name={'key'} value={detail.key} />
          <Button
            type={'submit'}
            className={'mt-[60px]'}
            disabled={!detail.active}
            // onClick={handleTicketUseClick}
          >
            {detail.active ? '使用する' : '使用済み'}
          </Button>
        </Form>
      </div>
    </main>
  )
}

export default TicketDetail
