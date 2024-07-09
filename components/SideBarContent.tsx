import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';
import { MasterSchedule as MasterScheduleOrig } from './MasterScheduleOrig';
import { MasterSchedule } from './MasterSchedule';
import { MasterScheduleEdit } from './MasterScheduleEdit';
import { Stack, Tab, Tabs } from '@airbus/components-react';
import { MasterScheduleLeftMenu } from './MasterScheduleLeftMenu';
import {
  PaneDirective,
  PanesDirective,
  SplitterComponent,
} from '@syncfusion/ej2-react-layouts';

const Schedule = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selection, setSelection] = React.useState<string>('');
  const tabs = ['V1 Gantt Edit', 'V1 Gantt Orig.', 'V2 Gantt Editable'];
  const tabsComponents: { [key: number]: React.ElementType } = {
    0: MasterSchedule,
    1: MasterScheduleOrig,
    2: MasterScheduleEdit,
  };
  const CurrentTabComponent = tabsComponents[selectedTab];

  const onChange = (value: number) => {
    setSelectedTab(value);
  };

  const selectionCallback = (value: string) => {
    setSelection(value);
  };

  return (
    <>
      <Stack padding="2-x" className="bg-coolgrey-10">
        <Tabs
          aria-label="Edit change tabs"
          value={selectedTab}
          onChange={(event, value) => setSelectedTab(value)}
          variant="container"
        >
          {tabs.map(tab => (
            <Tab key={tab}>{tab}</Tab>
          ))}
        </Tabs>
      </Stack>
      {/* {selectedTab === 0 ? <MasterSchedule /> : <MasterScheduleEdit />} */}
      <SplitterComponent id="splitter" height="10000px" width="100%">
        <PanesDirective>
          <PaneDirective
            size="20%"
            content={() => (
              <MasterScheduleLeftMenu selectionCallback={selectionCallback} />
            )}
          />
          <PaneDirective
            content={() => (
              // selectedTab === 0 ? <MasterSchedule /> : <MasterScheduleEdit />
              <CurrentTabComponent selection={selection} />
            )}
          />
        </PanesDirective>
      </SplitterComponent>
    </>
  );
};

export const SideBarContent = ({
  showSideBar,
  component,
}: {
  showSideBar: boolean;
  component: string;
}) => {
  return (
    <section
      className={`sidebar-content${showSideBar ? '' : ' is-full-width'}`}
    >
      <div className="sidebar-content-columns-items mb-10">
        <EditableAtributeChange
          label="CR/Context"
          attribute="cr_context"
          width="20%"
          enabled={false}
        />
        <EditableAtributeChange label="MP#" attribute="mp" width="10%" />
        <EditableAtributeChange label="MOD#" attribute="mod" width="10%" />
        <EditableAtributeChange
          label="MOD Title"
          attribute="title"
          width="60%"
        />
      </div>
      <div className="scrollable-content pr-5">
        <div className="sidebar-content-columns-items sidebar-content-columns-nitems">
          <EditableAtributeChange
            label="POE Conf"
            attribute="poe_conf"
            width="15%"
          />
          <EditableAtributeChange
            label="First MSN Manufactured"
            attribute=""
            width="17%"
          />
          <span className="inline-block w-1/12" />
          <EditableAtributeChange
            label="MOD Opening"
            attribute="opening"
            width="30%"
            blue
          />
          <EditableAtributeChange
            label="Scope"
            attribute="scope"
            width="30%"
            blue
          />
        </div>
        <PhaseAndStatusStepper />
        {component === 'Attributes' ? <EditChangeTabs /> : <Schedule />}
      </div>
    </section>
  );
};
