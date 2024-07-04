
import * as React from 'react';
import { ColorModeProvider, IconButton, Typography } from '@airbus/components-react';
import {
    Menu as MenuIcon
} from "@airbus/icons/react";

import { SideBarContent } from './SideBarContent';


function SideBarAndContent() {
    const sideBarTitles = //['Attributes', 'Multi-standard', 'Sketches & Comments', '..', 'Master Schedule', '..etc..']
        [
            { "title": "Attributes", component: 'Attributes' },
            { "title": "Multi-standard" },
            { "title": "Sketches & Comments" },
            { "title": "..." },
            { "title": "Master Schedule", component: 'MasterSchedule' },
            { "title": "..etc." }
        ]
    const [showSideBar, setShowSideBar] = React.useState<boolean>(true)
    const [component, setComponent] = React.useState<string>(sideBarTitles[0].title)
    const onClickMenuSidebar = () => {
        setShowSideBar(!showSideBar)
    }
    const onSideBarMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // find in sideBarTitles the component with match the title and set it to component
        const title = e.currentTarget.innerText
        const clickedComponent = sideBarTitles.find((sbTitle) => sbTitle.title === title)?.component
        setComponent(clickedComponent || '')
    }
    return (
        <div className="sidebar-container">
            <aside className={`sidebar-items${showSideBar ? '' : ' sidebar-collapsed'}`}>
                <ColorModeProvider mode="dark">
                    <div className="sidebar-items-right-aligned" onClick={onClickMenuSidebar}>
                        <IconButton variant="ghost" aria-label="Search">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    {showSideBar && sideBarTitles.map((sbTitle, i) => (
                        <Typography key={sbTitle.title} variant={"medium"} 
                            className={`mr-5 
                                ${sbTitle.component ? "hover:bg-blue-500 cursor-pointer" : ""}
                                ${component === sbTitle.component ? "bg-blue-700" : ""}
                            `}
                            onClick={sbTitle.component ? onSideBarMenuClick : undefined}>
                            {sbTitle.title}
                        </Typography>
                    ))}
                </ColorModeProvider>
            </aside>
            <SideBarContent showSideBar={showSideBar} component={component} />
        </div>
    )
};

export default SideBarAndContent;
