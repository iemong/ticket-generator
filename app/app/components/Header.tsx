import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { Link } from '@remix-run/react'
import Button from '~/components/Button'
import { useToast } from '~/hooks/useToast'
import { SupabaseContext } from '~/root'

type Props = {
  context: {
    SUPABASE_URL: string
    SUPABASE_ANON_KEY: string
  }
}

const Header: React.VFC<Props> = ({ context }: Props) => {
  const [isShowing, setIsShowing] = useState(false)

  const [toast] = useToast()
  const supabaseClient = useContext(SupabaseContext)

  const handleSignInViaGithub = useCallback(async () => {
    if (!supabaseClient) return
    const { error } = await supabaseClient.auth.signIn({
      // provider can be 'github', 'google', 'gitlab', and more
      provider: 'github',
    })
    if (error) {
      toast({ message: error?.message || '', type: 'error' })
    }
  }, [context])

  const handleSignOut = useCallback(async () => {
    if (!supabaseClient) return
    const { error } = await supabaseClient.auth.signOut()
    if (error) {
      toast({ message: error?.message || '', type: 'error' })
    }
  }, [context])

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (!supabaseClient) return
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
      console.log(_event, session)
    })
  }, [])

  return (
    <>
      <header
        className={
          'flex justify-center items-center px-[16px] h-[48px] bg-black'
        }
      >
        <div className={'w-[24px]'} />
        <h1 className={'mx-auto w-auto text-[18px] font-bold text-white'}>
          Ticket Generator
        </h1>
        <div className={'w-[24px]'}>
          <button
            className={
              'flex flex-col justify-center items-center h-[24px] hover:opacity-[0.7] transition-opacity'
            }
            onClick={() => setIsShowing((isShowing) => !isShowing)}
          >
            <div className={'w-[24px] h-[1px] bg-white'} />
            <div className={'mt-[8px] w-[24px] h-[1px] bg-white'} />
          </button>
        </div>
      </header>
      <aside>
        <Transition show={isShowing}>
          <Transition.Child
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={
              'absolute top-0 left-0 w-full h-screen bg-[#000] opacity-[0.6] pointer-events-auto'
            }
            onClick={() => setIsShowing((isShowing) => !isShowing)}
          />
          <Transition.Child
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            className={
              'absolute top-0 right-0 w-2/3 max-w-[300px] h-screen bg-black pointer-events-auto'
            }
          >
            <button
              className={
                'flex absolute top-[12px] right-[16px] flex-col justify-center items-center w-[24px] h-[24px] hover:opacity-[0.7] transition-opacity'
              }
              onClick={() => setIsShowing((isShowing) => !isShowing)}
            >
              <div
                className={
                  'absolute w-[24px] h-[1px] bg-white rotate-[45deg] translate-y-[-50%]'
                }
              />
              <div
                className={'absolute w-[24px] h-[1px] bg-white rotate-[-45deg]'}
              />
            </button>
            <ul className={'mt-[48px]'}>
              <li>
                {!isLoggedIn ? (
                  <div
                    className={
                      'block py-[8px] px-[16px] text-white hover:opacity-[0.7] transition-opacity'
                    }
                    onClick={handleSignInViaGithub}
                  >
                    <Button>GitHubでログイン</Button>
                  </div>
                ) : (
                  <div
                    className={
                      'block py-[8px] px-[16px] text-white hover:opacity-[0.7] transition-opacity'
                    }
                    onClick={handleSignOut}
                  >
                    <Button>ログアウト</Button>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to={'/'}
                  className={
                    'block py-[8px] px-[16px] text-white hover:opacity-[0.7] transition-opacity'
                  }
                  onClick={() => setIsShowing((isShowing) => !isShowing)}
                >
                  チケットを作成
                </Link>
              </li>
              <li>
                <Link
                  to={'/tickets'}
                  className={
                    'block py-[8px] px-[16px] text-white hover:opacity-[0.7] transition-opacity'
                  }
                  onClick={() => setIsShowing((isShowing) => !isShowing)}
                >
                  チケット一覧
                </Link>
              </li>
            </ul>
          </Transition.Child>
        </Transition>
      </aside>
    </>
  )
}

export default Header
