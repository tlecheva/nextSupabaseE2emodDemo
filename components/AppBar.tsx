import React from "react"
// React.useLayoutEffect = React.useEffect
import { Header, Tabs, Toast, Tab, IconButton, Button, Tooltip } from '@airbus/components-react'
import {
    Help as HelpIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    FlightTakeoff,
    PowerSettingsNew
} from "@airbus/icons/react";
import Link from "next/link";
import { Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import CustomerMenu from "./CustomerMenu";
function AppBar({ session, signInWithAzure, signOut }: {
    session: Session | null, signInWithAzure: () => Promise<void>, signOut: () => Promise<void>
}) {
    const [isToastVisible, setToastVisible] = useState(true);
    const [isClientMenuVisible, setClientMenuVisible] = useState(false);
    const handleClientMenu = () => {
        setClientMenuVisible(!isClientMenuVisible);
    };
    const handleCloseToast = () => {
        setToastVisible(false);
    };


    // avoid consolo.log className Server Client next.js warnings
    const [isClient, setIsClient] = useState(false)
    const [tab, setTab] = useState(0)

    const handleTabChange = (tabNumber: number) => {
        setTab(tabNumber);
    };

    // const handleTabChange = (event: React.ChangeEvent<{}>, tabId: number) => {
    //     console.log("🚀 ~ handleTabChange ~ tabId, event", tabId, event, event.target)
    //     debugger
    //     setTab(tabId);
    // };


    React.useEffect(() => {
        setIsClient(true)
    }, [])
    if (!isClient) return (<>Loading...</>)

    return !session ? (
        <>
            <Header appName="E2EMod">
                <Tabs value={1} size="large">
                    <Tab onClick={() => setToastVisible(!isToastVisible)} value={0}>Help</Tab>
                    <Tab value={1}><Button onClick={signInWithAzure} variant="ghost">Login</Button></Tab>
                </Tabs>
            </Header>
            {isToastVisible && (
                <div className="absolute top-35 right-10" >
                    <Toast allowClose onClose={handleCloseToast} /*autoHideDuration={5 * 1000}*/>
                        If you have an Azure account @E2EMod V2, login using above button above (top right corner).
                        <p>Otherwise below, create and use an email account to Login</p>
                    </Toast>
                </div>
            )}
        </>
    ) : (
        <Header appName="E2EMod">
            <Tabs value={tab}>
                <Tab value={0} onClick={() => setTab(0)}><Link href="/changes">Changes</Link></Tab>
                <Tab value={1} onClick={() => setTab(1)}><Link href="/changes_">Changes_</Link></Tab>
                <Tab value={2} onClick={() => setTab(2)}><Link href="/posts">Posts</Link></Tab>
                <Tab value={3} onClick={() => setTab(3)}><Link href="/todos">Todos</Link></Tab>
            </Tabs>
            <Tabs />
            <IconButton disabled variant="ghost" />
            <Tabs />
            <IconButton disabled variant="ghost" aria-label="Search">
                <SearchIcon />
            </IconButton>
            <IconButton disabled variant="ghost" aria-label="Notifications">
                <NotificationsIcon />
            </IconButton>
            <IconButton disabled variant="ghost" aria-label="Help">
                <HelpIcon />
            </IconButton>
            <IconButton disabled variant="ghost" aria-label="Help">
                <FlightTakeoff />
            </IconButton>
            <IconButton disabled variant="ghost" />
            <Tabs />
            <div className="flex flex-col w-56">
                <div className="flex gap-1">
                    <div className="mt-3">{session.user.email}</div>
                    <Tooltip placement="bottom" label="Logout">
                        <IconButton variant="ghost" aria-label="Help" onClick={signOut} >
                            <PowerSettingsNew />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="flex justify-items-end">
                    <CustomerMenu />
                </div>
            </div>
        </Header >
    )
}

export default AppBar