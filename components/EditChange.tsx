
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
        console.log("🚀 ~ onClickMenuSidebar ~ showSideBar:", showSideBar)
        setShowSideBar(!showSideBar)
    }

    const [query, setQuery] = React.useState<ParsedUrlQuery | null>(null)
    console.log("🚀 ~ query:", query)
    React.useEffect(() => {
        setQuery(router?.query)
    }, [router.query]);

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
            <section className={`sidebar-content${showSideBar ? '' : ' is-full-width'}`}>
                <button onClick={onClickMenuSidebar} className="btn">Toggle</button>
                <div id="sidebar-content-columns" >
                    <div className="sidebar-content-columns-items" >
                        {/* <div className="sidebar-content" style={{ paddingLeft: showSideBar ? "60px" : '210px' }}> */}
                        <div className="title">CR/Context</div>
                        <TextAreaComponent id='default' placeholder='CR/Context' value={query?.cr_context} width="25%" height="30" />
                        <div className="title">MP#</div>
                        <TextAreaComponent id='default' placeholder='' value={query?.mp} width="25%" />
                        <TextAreaComponent id='default' placeholder='MOD#' value={query?.mod} width="25%" />
                        <TextAreaComponent id='default' placeholder='Scope' value={query?.scope} width="80%" />
                    </div>
                    <br />
                    <TextAreaComponent id='default' placeholder='MOD Title' value={query?.title} width="90%" />

                    <div className="title">Main content</div>
                    <div className="sub-title"> content goes here</div>
                    <div className="sub-title"> content goes here</div>
                    <Input placeholder="Placeholder" onChange={() => console.log("onChange")} />
                    <input className="e-input" type="text" placeholder="Enter Name" />
                </div>

                <div className="title">Main content</div>
                <div className="sub-title"> content goes here</div>
                <div className="sub-title"> content goes here</div>
                <Input placeholder="Placeholder" onChange={() => console.log("onChange")} />
                <input className="e-input" type="text" placeholder="Enter Name" />
                <TextAreaComponent id='default' placeholder='Enter your comments' floatLabelType='Auto'>My Comment</TextAreaComponent>
                <TextAreaComponent id='default' placeholder='Space' floatLabelType='Auto'></TextAreaComponent>
            </section>
        </div>)
};

export default EditChange;