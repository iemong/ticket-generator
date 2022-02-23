import React, { useCallback } from 'react'
import {
  ActionFunction,
  Form,
  json,
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
    'og:image': `https://text-pict.vercel.app/${encodeURI(d.name)}`,
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
    return { res: null, error }
  }

  return { res: json('ok'), error: null }
}

const TicketDetail: React.VFC = () => {
  const detail = useLoaderData<Ticket>()
  const actionData = useActionData()

  const handleShareClick = useCallback(async () => {
    const res = await fetch(
      `https://text-pict.vercel.app/${encodeURI(detail.name)}`
    )
    const blobData = await res.blob()
    const imageFile = new File([blobData], `${detail.name}.png`, {
      type: 'image/png',
    })
    await navigator.share({
      text: 'チケットをあげる',
      url: `${DOMAIN_NAME}${location.pathname}`,
      files: [imageFile],
    })
  }, [])

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
          {actionData?.error && <p>{JSON.stringify(actionData.error)}</p>}
          <input type="hidden" name={'key'} value={detail.key} />
          <Button
            type={'submit'}
            className={'mt-[60px]'}
            disabled={!detail.active}
          >
            {detail.active ? '使用する' : '使用済み'}
          </Button>
        </Form>
        <Button className={'mt-[24px]'} onClick={handleShareClick}>
          シェアする
        </Button>
      </div>
    </main>
  )
}

export default TicketDetail
