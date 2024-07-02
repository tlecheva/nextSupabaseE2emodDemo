
import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';

export const SideBarContent = ({ showSideBar }:
    { showSideBar: boolean }) =>
(
    <section className={`sidebar-content${showSideBar ? '' : ' is-full-width'}`}>
        <div className="sidebar-content-columns-items mb-10" >
            {EditableAtributeChange('CR/Context', 'cr_context', '20%', { enabled: false })}
            {EditableAtributeChange('MP#', 'mp', '10%')}
            {EditableAtributeChange('MOD#', 'mod', '10%')}
            {EditableAtributeChange('MOD Title', 'title', '60%')}
        </div>
        <div className="scrollable-content pr-5">
            <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
                {EditableAtributeChange('POE Conf', 'poe_conf', '15%')}
                {EditableAtributeChange('First MSN Manufactured', '', '17%')}
                {EditableAtributeChange('MOD Opening', 'opening', '40%', { blue: true })}
                {EditableAtributeChange('Scope', 'scope', '50%', { blue: true })}
            </div>
            <PhaseAndStatusStepper />
            <EditChangeTabs />
        </div>

    </section>
)
