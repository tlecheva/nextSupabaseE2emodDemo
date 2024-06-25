
import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';

export const SideBarContent = ({ showSideBar }:
    { showSideBar: boolean }) =>
(
    <section className={`scrollable-content sidebar-content${showSideBar ? '' : ' is-full-width'}`}>
        <div className="sidebar-content-columns-items" >
            {EditableAtributeChange('CR/Context', 'cr_context', '20%', { enabled: false })}
            {EditableAtributeChange('MP#', 'mp', '18%')}
            {EditableAtributeChange('MOD#', 'mod', '18%')}
            {EditableAtributeChange('Scope', 'scope', '50%', { blue: true })}
        </div>
        <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
            {EditableAtributeChange('MOD Title', 'title', '100%')}
        </div>
        <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
            {EditableAtributeChange('POE Conf', 'poe_conf', '18%')}
            {EditableAtributeChange('First MSN Manufactured', '', '37%')}
            {EditableAtributeChange('MOD Opening', 'opening', '100%', { blue: true })}
        </div>
        <PhaseAndStatusStepper />
        <EditChangeTabs />
    </section>
)
