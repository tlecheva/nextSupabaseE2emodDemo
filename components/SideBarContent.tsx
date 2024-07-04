
import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';
import { MasterSchedule } from './MasterSchedule';
import { MasterScheduleEdit } from './MasterScheduleEdit';
import { Stack, Tab, Tabs } from '@airbus/components-react';
import { MasterScheduleLeftMenu } from './MasterScheduleLeftMenu';
import { PaneDirective, PanesDirective, SplitterComponent } from '@syncfusion/ej2-react-layouts';

const Schedule = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabs = ['V1 Gantt', 'V2 Gantt Editable']

    const onChange = (value: number) => {
        setSelectedTab(value)
    }

    return (
        <>
            <Stack padding="2-x" className="bg-coolgrey-10">
                <Tabs
                    aria-label="Edit change tabs"
                    value={selectedTab}
                    onChange={(event, value) => setSelectedTab(value)}
                    variant="container"
                >
                    {tabs.map((tab) => (<Tab key={tab}>{tab}</Tab>))}
                </Tabs>
            </Stack>
            {/* {selectedTab === 0 ? <MasterSchedule /> : <MasterScheduleEdit />} */}
            <SplitterComponent id="splitter" height="100%" width="100%">
                <PanesDirective>
                    <PaneDirective size='10%' content={() => (<MasterScheduleLeftMenu />)
                    } />
                    <PaneDirective content={() =>
                        selectedTab === 0 ? <MasterSchedule /> : <MasterScheduleEdit />

                    } />
                </PanesDirective>
            </SplitterComponent>
        </>
    );
}

export const SideBarContent = ({ showSideBar, component }:
    { showSideBar: boolean, component: string }) =>
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
                <span className='inline-block w-1/12' />
                {EditableAtributeChange('MOD Opening', 'opening', '30%', { blue: true })}
                {EditableAtributeChange('Scope', 'scope', '30%', { blue: true })}
            </div>
            <PhaseAndStatusStepper />
            {component === 'Attributes' ? <EditChangeTabs /> : <Schedule />}

            {/* <div style={{ height: '2500px', overflowY: 'auto' }}>
                <div style={{ height: '2500px', overflowY: 'auto' }}>
                {component === 'Attributes' ? <EditChangeTabs /> : <Schedule />}
            </div> */}

        </div>
    </section>
)
