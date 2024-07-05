import * as React from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { Warning, FeaturedPlayListOutline, FeaturedPlayList, OfflineBoltOutline, OfflineBolt, Build, BuildOutline } from "@airbus/icons/react";

import * as dataSource from './MasterScheduleLeftMenuData.json';
import Image from 'next/image';
export const MasterScheduleLeftMenu = () => {
    const data = dataSource;
    const fields = { dataSource: data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild' };
    const iconMapping = { Warning, FeaturedPlayListOutline, FeaturedPlayList, OfflineBoltOutline, OfflineBolt, Build, BuildOutline }

    const getNodeIcon = (iconName: string, color: string) => {
        // Get the component from the mapping object using the iconName
        const IconComponent = iconMapping[iconName];

        // Check if the IconComponent exists to avoid rendering errors
        if (!IconComponent) {
            console.warn(`Icon "${iconName}" not found.`);
            return null; // or return a default icon
        }
        return <IconComponent className={"w-[21px] h-[30px] " + color} />;
    };

    const nodeTemplate = (data) => {
        const image = "/" + data.image + ".png"
        const className = data.color ? 'text-' + data.color + '-500' : 'text-black';
        const iconColor = data.iconColor ? 'text-' + data.iconColor + '-500' : '';
        return (
            <div className='flex gap-2'>
                {data.icon && getNodeIcon(data.icon, iconColor)}
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    data.image && <img src={image} alt={data.image} className="img-small" />
                }
                <span className={className}>{data.nodeText}</span>
            </div>
        );
    };
    return (
        <TreeViewComponent id="treeview" fields={fields} nodeTemplate={nodeTemplate} />
    )

};
