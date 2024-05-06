import React from "react"
import { supabase } from '@/lib/initSupabase'
import '@/styles/app.css'
import '@/styles/AppBar.css'
import '@/styles/Posts.css'
import Layout from '@/components/Layout'; // Import the missing module

import { SessionContextProvider } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'

// to avoid useLayoutEffect warnings
// if (typeof window === "undefined") React.useLayoutEffect = () => { };
import { registerLicense } from "@syncfusion/ej2-base";

if (!process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE) {
  throw new Error('NEXT_PUBLIC_SYNCFUSION_LICENSE should be set in .env file');
}
registerLicense(
  // create a .env file and add the license key inside it 
  // NEXT_PUBLIC_SYNCFUSION_LICENSE='your_license_key_here'
  process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE,
);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
