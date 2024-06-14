
import * as React from 'react';
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod } from '@/lib/initSupabase';
import { ItemModel, SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { useEditChangeHeader, useTableContent, useTableHeaders } from '@/lib/changeDbCalls';
import { ColorModeProvider, IconButton, Input, Typography } from '@airbus/components-react';
import {
    Menu as MenuIcon
} from "@airbus/icons/react";
import {
    Help as HelpIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon,
    FlightTakeoff,
    PowerSettingsNew,
    CompareArrows
} from "@airbus/icons/react";
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

function EditChange() {
    const router = useRouter();
    const tableHeaders = useEditChangeHeader()
    const [showSideBar, setShowSideBar] = React.useState(true)
    const sideBarTitles = ['Attributes', 'Multi-standard', 'Sketches & Comments', '..etc..']
    const onClickMenuSidebar = () => {
        setShowSideBar(!showSideBar)
    }

    const [query, setQuery] = React.useState<ParsedUrlQuery | null>(null)
    console.log("🚀 ~ query:", query)
    React.useEffect(() => {
        setQuery(router?.query)
    }, [router.query]);

    return (
        <div className="container">
            <aside className="sidebar">
            </aside>
            <section className="content">
                <button className="btn">Toggle</button>
            </section>
        </div>)

    return (
        <div id="sidebar-wrapper">
            <SidebarComponent id="sidebar-component"
                style={{ width: showSideBar ? "210px" : '60px' }}
            >
                <ColorModeProvider mode="dark">
                    <div className="sidebar-right-aligned-container" onClick={onClickMenuSidebar} >
                        <IconButton variant="ghost" aria-label="Search">
                            <MenuIcon />
                        </IconButton>
                    </div>
                    {showSideBar && sideBarTitles.map((title) => (
                        <Typography key={title} variant="medium" color="secondary">
                            {title}
                        </Typography>))
                    }
                </ColorModeProvider>
            </SidebarComponent>
            <div id="sidebar-content-columns" style={{ paddingLeft: showSideBar ? "50px" : '10px' }}>
                <div className="sidebar-content" >
                    {/* <div className="sidebar-content" style={{ paddingLeft: showSideBar ? "60px" : '210px' }}> */}
                    <TextAreaComponent id='default' placeholder='CR/Context' value={query?.cr_context} width="500" height="30" />
                    <TextAreaComponent id='default' placeholder='MP#' value={query?.mp} width="500" />
                    <TextAreaComponent id='default' placeholder='MOD#' value={query?.mod} width="500" />
                    <TextAreaComponent id='default' placeholder='Scope' value={query?.scope} width="2000" />
                </div>
                <br />
                <TextAreaComponent id='default' placeholder='MOD Title' value={query?.title} width="90%" />

                <div className="title">Main content</div>
                <div className="sub-title"> content goes here</div>
                <div className="sub-title"> content goes here</div>
                <Input placeholder="Placeholder" onChange={() => console.log("onChange")} />
                <input className="e-input" type="text" placeholder="Enter Name" />
                <TextAreaComponent id='default' placeholder='Enter your comments' floatLabelType='Auto'>My Comment</TextAreaComponent>
            </div>
        </div >)

};

export default EditChange;
