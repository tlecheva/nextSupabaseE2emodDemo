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
import { Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import CustomerMenu from "./CustomerMenu";

import dynamic from 'next/dynamic'


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
            <Tabs value={0}>
                <Tab value={0}>Tab Label</Tab>
                <Tab value={1}>Tab Label</Tab>
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