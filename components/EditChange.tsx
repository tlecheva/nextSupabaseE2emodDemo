
import * as React from 'react';
import { useEditChangeHeader } from '@/lib/changeDbCalls';
import { ColorModeProvider, Divider, IconButton, Input, Typography } from '@airbus/components-react';
import {
    Menu as MenuIcon
} from "@airbus/icons/react";

import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { updateChange } from '@/lib/updateChange';




function EditChange() {
    const router = useRouter();
    const tableHeaders = useEditChangeHeader()
    const [showSideBar, setShowSideBar] = React.useState(true)
    const sideBarTitles = ['Attributes', 'Multi-standard', 'Sketches & Comments', '..etc..']
    const onClickMenuSidebar = () => {
        setShowSideBar(!showSideBar)
    }

    const EditableHeaderChange = (label: string, attribute: string, width: string, { blue = false, enabled = true }
        : { blue?: boolean, enabled?: boolean } = {}) => {
        const query = router.query
        const { change_id } = query
        const val = query[attribute]
        const value: string = !val || val === 'null' ? '' : String(val)
        return (
            <>
                <TextAreaComponent id='default'
                    placeholder={label}
                    enabled={enabled}
                    floatLabelType="Always"
                    value={value}
                    width={width}
                    cssClass={blue ? 'textAeraComponent-blue' : ''}
                    resizeMode="Vertical"
                    rows={1} /* works well */
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateChange(String(change_id), attribute, e.target.value)}
                />
            </>)
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
            <section className={`sidebar-content${showSideBar ? '' : ' is-full-width'}`}>
                <div className="sidebar-content-columns-items" >
                    {EditableHeaderChange('CR/Context', 'cr_context', '20%', { enabled: false })}
                    {EditableHeaderChange('MP#', 'mp', '18%')}
                    {EditableHeaderChange('MOD#', 'mod', '18%')}
                    {EditableHeaderChange('Scope', 'scope', '50%', { blue: true })}
                </div>
                <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
                    {EditableHeaderChange('MOD Title', 'title', '100%')}
                </div>
                <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
                    {EditableHeaderChange('POE Conf', 'poe_conf', '18%')}
                    {EditableHeaderChange('First MSN Manufactured', '', '37%')}
                    {EditableHeaderChange('MOD Opening', 'opening', '100%', { blue: true })}
                </div>
            </section>
        </div>)
};

export default EditChange;
