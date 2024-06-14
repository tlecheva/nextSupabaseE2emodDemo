import React from "react"
import { useRouter } from 'next/router';
import { Header, Tabs, Toast, Tab, IconButton, Button, Tooltip } from '@airbus/components-react'
import {
    Help as HelpIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    FlightTakeoff,
    PowerSettingsNew,
    CompareArrows
} from "@airbus/icons/react";
import Link from "next/link";
import { Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import CustomerMenu from "./CustomerMenu";


export function useTab() {

    const [tab, setTab] = useState(-1)

    const handleTabChange = (tabNumber: number) => {
        setTab(tabNumber);
    };
    const availableRoutes = [
        { tab: 0, path: "/changes", label: "Changes" },
        { tab: 1, path: "/changesOld", label: "Changes (old)" },
        { tab: 2, path: "/posts", label: "Posts" },
        { tab: 3, path: "/todos", label: "Todos" },
    ]
    const router = useRouter()

    React.useEffect(() => {
        const path = router.pathname;
        const tabNumber = availableRoutes.findIndex(route => route.path === path);
        setTab(tabNumber !== -1 ? tabNumber : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname])
    return { tab, availableRoutes };
}

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
    const { tab, availableRoutes } = useTab()
    const [openCustomerMenu, setOpenCustomerMenu] = useState(false)

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
                {availableRoutes.map((route) => (
                    <Tab key={route.tab} value={route.tab}>
                        {/* legacyBehavior is there to avoid <a> console warning, more details here:
                        https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7 */}
                        <Link legacyBehavior href={route.path}>{route.label}</Link>
                    </Tab>))
                    }
            </Tabs>
            <Tabs />
            <IconButton disabled variant="ghost" />
            <Tabs />
                <div className="flex gap-2 content-end">

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
                    {/* <CustomerMenu openCustomerMenu={openCustomerMenu} /> */}

                    <IconButton disabled variant="ghost" />

                    <div className="w-40">
                        <CustomerMenu openCustomerMenu={openCustomerMenu} />
                    </div>
                    {/* <div className="w-56 flex gap-1"> */}
                    <div className="mt-3">{session.user.email}</div>
                    <Tooltip placement="bottom" label="Logout">
                        <IconButton variant="ghost" aria-label="Help" onClick={signOut} >
                            <PowerSettingsNew />
                        </IconButton>
                    </Tooltip>
                    {/* </div> */}
            </div>
        </Header >

    )
}

export default AppBar