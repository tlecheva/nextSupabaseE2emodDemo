import React from "react"
React.useLayoutEffect = React.useEffect
import { Header, Tabs, Toast, Tab, IconButton, Button } from '@airbus/components-react'
import {
    Help as HelpIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    FlightTakeoff,
    PowerSettingsNew
} from "@airbus/icons/react";
import { Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'


function AppBar({ session, signInWithAzure, signOut }: {
    session: Session | null, signInWithAzure: () => Promise<void>, signOut: () => Promise<void>
}) {
    const [isToastVisible, setToastVisible] = useState(true);
    const handleCloseToast = () => {
        setToastVisible(false);
    };
    console.log("🚀 ~ session:", session)

    return !session ? (
        <>
            <Header appName="ATLANTIC - E2EMod">
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
        <Header appName="ATLANTIC - E2EMod">
            <Tabs value={0}>
                <Tab value={0}>Tab Label</Tab>
                <Tab value={1}>Tab Label</Tab>
            </Tabs>
            <Tabs />
            <IconButton disabled variant="ghost" />
            <Tabs />
            <IconButton variant="ghost" aria-label="Search">
                <SearchIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Notifications">
                <NotificationsIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Help">
                <HelpIcon />
            </IconButton>
            <IconButton disabled variant="ghost" />
            <Tabs />

            <div className="flex flex-col justify-end ">
                <div className="mt-3">{session.user.email}</div>
                <div className="flex justify-center align-middle">
                    <Button variant="ghost" icon={<FlightTakeoff />} >
                        Airbus / SA
                    </Button>
                </div>
            </div>
            <Button variant="primary" icon={<PowerSettingsNew />} onClick={signOut}>Logout </Button>
        </Header >
    )
}

export default AppBar