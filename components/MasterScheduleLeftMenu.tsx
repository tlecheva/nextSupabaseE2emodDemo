import * as React from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { Event, CalendarViewDayOutline } from "@airbus/icons/react";

import * as dataSource from './MasterScheduleLeftMenuData.json';
export const MasterScheduleLeftMenu = () => {
    const data = dataSource;
    const fields = { dataSource: data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
    // const treeData = [
    //     { id: 1, name: 'Item 1', icon: 'icon-class-1' },
    //     { id: 2, name: 'Item 2', icon: 'icon-class-2' },
    //     // Add more nodes as needed
    // ];
    const getNodeIcon = (iconName) => {
        // This function should return the appropriate Airbus icon component
        // based on the iconName or other criteria.
        // This is a placeholder function. You'll need to implement the logic
        // to return the correct icon component.
        return <CalendarViewDayOutline />;
    };
    const nodeTemplate = (data) => {
        console.log("🚀 ~ nodeTemplate ~ data:", data)
        return (
            <div className='w-1000'>
                {getNodeIcon(data.icon)}
                <span>{data.name}</span>
            </div>
        );
    };
    // return (
    //     <TreeViewComponent
    //         fields={{ dataSource: treeData, id: 'id', text: 'name', child: 'subItems' }}
    //         nodeTemplate={nodeTemplate}
    //     />
    // );
    return (
        <TreeViewComponent id="treeview" fields={fields} nodeTemplate={nodeTemplate} />
    )

};
