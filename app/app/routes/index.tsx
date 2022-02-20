import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useActionData,
} from 'remix'
import { createClient } from '@supabase/supabase-js'
import Header from '~/components/Header'
import Headline from '~/components/Headline'
import FormInput from '~/components/FormInput'
import FormTextarea from '~/components/FormTextarea'
import Button from '~/components/Button'

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

export const action: ActionFunction = async ({ request, context }) => {
  const supabase = createClient(
    context.SUPABASE_URL ?? '',
    context.SUPABASE_ANON_KEY ?? '',
    {
      fetch: (...args) => fetch(...args),
    }
  )

  const formData = await request.formData()
  const name = formData.get('name')
  const description = formData.get('description')

  const { data, error } = await supabase
    .from('ticket')
    .insert([{ name, description, user_id: 1 }])
    .single()

  if (error) {
    return error
  }

  return redirect(`/tickets/${data.key}`)
}

// TODO 入力部分と共通部分分ける
// TODO validation
export default function Index() {
  const error = useActionData()

  return (
    <div>
      <main className={'px-[16px] mt-[48px] sm:px-[32px]'}>
        <Headline as="h2" className={'mb-[48px]'}>
          チケットをつくる
        </Headline>
        <Form method="post">
          {error && <p>{JSON.stringify(error)}</p>}
          <FormInput
            id={'name'}
            name={'name'}
            labelText={'チケットの名前'}
            required={true}
            className={'mb-[24px]'}
          />
          <FormTextarea
            name={'description'}
            id={'description'}
            labelText={'説明'}
            className={'mb-[60px]'}
          />
          <Button type="submit">券を作成</Button>
        </Form>
      </main>
    </div>
  )
}
