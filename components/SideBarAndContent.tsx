
import * as React from 'react';
import { ColorModeProvider, IconButton, Typography } from '@airbus/components-react';
import {
    Menu as MenuIcon
} from "@airbus/icons/react";

import { SideBarContent } from './SideBarContent';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';


function SideBarAndContent() {
    const [showSideBar, setShowSideBar] = React.useState<boolean>(true)
    const sideBarTitles = ['Attributes', 'Multi-standard', 'Sketches & Comments', '..etc..']
    const onClickMenuSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    return (
        <div className="sidebar-container">
            <aside className={`sidebar-items${showSideBar ? '' : ' sidebar-collapsed'}`}>
                <ColorModeProvider mode="dark">
                    <div className="sidebar-items-right-aligned" onClick={onClickMenuSidebar} >
                        <IconButton variant="ghost" aria-label="Search">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    {showSideBar && sideBarTitles.map((title) => (
                        <Typography key={title} variant="medium" color="secondary" className="mr-5">
                            {title}
                        </Typography>))
                    }
                </ColorModeProvider>
            </aside>
            <SideBarContent showSideBar={showSideBar} />
        </div>)
};

export default SideBarAndContent;
