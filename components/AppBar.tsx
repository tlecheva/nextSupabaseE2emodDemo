import React from "react"
React.useLayoutEffect = React.useEffect
import { Header, Tabs, Toast, Tab, IconButton, Button } from '@airbus/components-react'
import {
    Help as HelpIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
} from "@airbus/icons/react";
import { Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'


function AppBar({ session, onClick }: {
    session: Session | null, onClick: () => Promise<void>
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
                    <Tab value={1}><Button onClick={onClick} variant="ghost">Login</Button></Tab>
                </Tabs>
            </Header>
            {isToastVisible && (
                <div className="absolute top-35 right-10" >
                    {/* <Toast allowClose inline title="How to Login" time="2:35 am" onClose={handleCloseToast}> */}
                    <Toast allowClose onClose={handleCloseToast} autoHideDuration={6 * 1000}>
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
                <Tab value={2}>Tab Label</Tab>
            </Tabs>
            <IconButton variant="ghost" aria-label="Search">
                <SearchIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Notifications">
                <NotificationsIcon />
            </IconButton>
            <IconButton variant="ghost" aria-label="Help">
                <HelpIcon />
            </IconButton>
            <Button variant="primary">Logout</Button>
        </Header>
    )
}

export default AppBar