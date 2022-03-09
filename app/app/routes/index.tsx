import { ActionFunction, Form, redirect, useActionData } from 'remix'
import Headline from '~/components/Headline'
import FormInput from '~/components/FormInput'
import FormTextarea from '~/components/FormTextarea'
import Button from '~/components/Button'
import { useContext } from 'react'
import { SupabaseContext } from '~/root'
import { supabase } from '~/utils/supabase'

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData()
  const name = formData.get('name')
  const description = formData.get('description')
  const userId = formData.get('userId') || null

  const { data, error } = await supabase(context)
    .from('ticket')
    .insert([{ name, description, user_id: userId }])
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
  const supabaseClient = useContext(SupabaseContext)
  const user = supabaseClient?.auth.user()

  return (
    <div>
      <main className={'px-[16px] mt-[48px] sm:px-[32px]'}>
        <Headline as="h2" className={'mb-[48px]'}>
          チケットをつくる
        </Headline>
        <Form method="post">
          {error && <p>{JSON.stringify(error)}</p>}
          <input type="hidden" name="userId" value={user?.id} />
          <FormInput
            id={'name'}
            name={'name'}
            labelText={'チケットの名前'}
            required={true}
            className={'mb-[24px]'}
            placeholder={'肩たたき券'}
          />
          <FormTextarea
            name={'description'}
            id={'description'}
            labelText={'説明'}
            className={'mb-[60px]'}
            placeholder={'肩を20回叩きます。'}
          />
          <Button type="submit">券を作成</Button>
        </Form>
      </main>
    </div>
  )
}
