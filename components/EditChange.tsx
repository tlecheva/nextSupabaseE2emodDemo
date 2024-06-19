
import * as React from 'react';
import { useEditChangeHeader } from '@/lib/changeDbCalls';
import { ColorModeProvider, IconButton, Input, Typography } from '@airbus/components-react';
import {
    Menu as MenuIcon
} from "@airbus/icons/react";

import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { updateChangeTitle } from '@/lib/updateChange';

function EditChange() {
    const router = useRouter();
    const tableHeaders = useEditChangeHeader()
    const [showSideBar, setShowSideBar] = React.useState(true)
    const sideBarTitles = ['Attributes', 'Multi-standard', 'Sketches & Comments', '..etc..']
    const onClickMenuSidebar = () => {
        setShowSideBar(!showSideBar)
    }

    const [query, setQuery] = React.useState<ParsedUrlQuery | null>(null)


    React.useEffect(() => {
        setQuery(router?.query)
    }, [router.query]);

    const { cr_context, change_id, mp, mod, title, scope } = query || {} as ParsedUrlQuery;


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
                <div id="sidebar-content-columns">
                    <div className="sidebar-content-columns-items disabled" >
                        <Typography variant="small" color="secondary" className="">CR/Context</Typography>
                        <TextAreaComponent id='default' placeholder='CR/Context' value={cr_context} width="27%" className="disabled" />
                        <Typography variant="small" color="secondary">MP#</Typography>
                        <TextAreaComponent id='default' placeholder='' value={mp} width="18%" />
                        <Typography variant="small" color="secondary">MOD#</Typography>
                        <TextAreaComponent id='default' placeholder='MOD#' value={mod} width="18%" />
                        <Typography variant="small" color="tertiary">Scope</Typography>
                        <TextAreaComponent id='default' placeholder='Scope' value={scope} width="50%" />
                    </div>
                    <br />
                    <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
                        <Typography variant="small" color="secondary" className="mr-3">MOD Title (db change is enabled here)</Typography>
                        <TextAreaComponent id='default'
                            placeholder='MOD Title'
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateChangeTitle(change_id, e)}
                            width="100%" />
                    </div>
                </div>

                {/* <div className="title">Main content</div>
                <div className="sub-title"> content goes here</div>
                <div className="sub-title"> content goes here</div>
                <Input placeholder="Placeholder" onChange={() => console.log("onChange")} />
                <input className="e-input" type="text" placeholder="Enter Name" />
                <TextAreaComponent id='default' placeholder='Enter your comments' floatLabelType='Auto'>My Comment</TextAreaComponent>
                <TextAreaComponent id='default' placeholder='Space' floatLabelType='Auto'></TextAreaComponent> */}
            </section>
        </div>)
};

export default EditChange;
