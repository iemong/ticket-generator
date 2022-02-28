import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'remix'
import type { MetaFunction } from 'remix'
import styles from '~/styles/generated.css'
import Header from '~/components/Header'
import { Slide, ToastContainer } from 'react-toastify'
import React, { useMemo } from 'react'
import ReactToastifyStyles from 'react-toastify/dist/ReactToastify.css'
import { supabaseClient } from '~/utils/supabase'
import { SupabaseClient } from '@supabase/supabase-js'

export const meta: MetaFunction = () => {
  return { title: 'New Remix App' }
}
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: ReactToastifyStyles },
  ]
}

export const loader: LoaderFunction = async ({ context }) => {
  return {
    SUPABASE_URL: context.SUPABASE_URL,
    SUPABASE_ANON_KEY: context.SUPABASE_ANON_KEY,
  }
}

export const SupabaseContext = React.createContext<SupabaseClient | null>(null)

export default function App() {
  const env = useLoaderData()

  const sc = useMemo(
    () => supabaseClient({ url: env.SUPABASE_URL, key: env.SUPABASE_ANON_KEY }),
    [env]
  )

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SupabaseContext.Provider value={sc}>
          <Header context={env} />
          <Outlet />
        </SupabaseContext.Provider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
        />
      </body>
    </html>
  )
}
