import React from "react"
import { supabase } from '@/lib/initSupabase'
import '@/styles/app.css'
import '@/styles/AppBar.css'
import '@/styles/posts.css'
import Layout from '@/components/Layout'; // Import the missing module

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'

// to avoid useLayoutEffect warnings
// if (typeof window === "undefined") React.useLayoutEffect = () => { };


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
