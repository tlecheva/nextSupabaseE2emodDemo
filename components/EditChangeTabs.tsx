import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { Stack, Tab, Tabs } from '@airbus/components-react';
import { Event } from "@airbus/icons/react";
import { AttributesForCategory } from './AttributesForCategory';

export const EditChangeTabs = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const categories = ['General attributes', 'Evaluation analysis', 'Investigation analysis', 'Industrial Calendar']
    const [category, setCategory] = React.useState(categories[0]);

    const onChange = (value: number) => {
        setSelectedTab(value)
        setCategory(categories[value])
    }

    return (
        <>
            <Stack padding="2-x" className="bg-coolgrey-10 mt-5">
                <Tabs
                    aria-label="Edit change tabs"
                    value={selectedTab}
                    onChange={(event, value) => onChange(value)}
                    variant="container"
                >
                    <Tab>General Attributes</Tab>
                    <Tab>Evaluation Analysis</Tab>
                    <Tab>Investigation Analysis</Tab>
                    <Tab disabled icon={<Event />}>Industrial Calendar</Tab>
                </Tabs>
            </Stack>
            <AttributesForCategory category={category} />
        </>
    );
}
