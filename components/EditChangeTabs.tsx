import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Stack, Tab, Tabs } from '@airbus/components-react';
import { Event } from "@airbus/icons/react";
import { GeneralAttributes } from './GeneralAttributes';


export const EditChangeTabs = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (
        <>
            <Stack padding="2-x" className="bg-coolgrey-10 mt-5">
                <Tabs
                    aria-label="Edit change tabs"
                    value={selectedTab}
                    onChange={(event, value) => setSelectedTab(value)}
                    variant="container"
                >
                    <Tab>General Attributes</Tab>
                    <Tab >Evaluation Analysis</Tab>
                    <Tab disabled>Investigation Analysis</Tab>
                    <Tab icon={<Event />}>Industrial Calendar</Tab>
                </Tabs>
            </Stack>
            <GeneralAttributes />

        </>
    );
}
