import React, { PropsWithChildren } from "react";
import Head from 'next/head'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import AppBar from '@/components/AppBar'
import Changes from "./Changes";


export default function Layout({ children }: PropsWithChildren) {
    const session = useSession()
    const supabase = useSupabaseClient()


    async function signInWithAzure() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "azure",
            options: {
                scopes: "email", // important! otherwise does not work
            },
        });
        if (error)
            console.log("🚀 ~ signInWithAzure ~ data, error:", data, error);
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut()
        if (error) console.log('Error logging out:', error.message)
    }

    return (
        <div>
            <div className="left-0 right-0 fixed">
                <Head>
                    <title>E2EMod</title>
                    <meta name="description" content="Airbus Atlantic | End to End Change Mode managment" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <AppBar session={session} signInWithAzure={signInWithAzure} signOut={signOut} />
            </div >

            {!session ? (
                <div
                    className="flex flex-col items-center justify-center bg-cover bg-center h-full"
                    style={{
                        backgroundImage: "url('/airbus_atlantic_1920x640px.png')"
                    }}>
                    <div className="w-full h-full flex justify-center items-center p-4 mt-20">
                        <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
                            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
                        </div>
                    </div>
                </div>
            ) :
                (
                    <div className="p-2" >
                        {children}
                    </div>
                )
            }
        </div >
    )
}
