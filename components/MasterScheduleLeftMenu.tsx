import * as React from 'react';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import {
  Warning,
  WarningOutline,
  FeaturedPlayListOutline,
  FeaturedPlayList,
  OfflineBoltOutline,
  OfflineBolt,
  Build,
  BuildOutline,
} from '@airbus/icons/react';

import * as dataSource from './MasterScheduleLeftMenuData.json';
import Image from 'next/image';

import { SVGProps } from 'react';

// Define a type for your icons that accepts any string as the key and returns a React component
type IconMappingType = {
  [key: string]: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

interface NodeSelectArgs {
  nodeData: {
    text: string;
  };
}

export const MasterScheduleLeftMenu = () => {
  const treeViewRef = React.useRef(null);
  const data = dataSource;
  const fields = {
    dataSource: data.iconData as any[],
    id: 'nodeId',
    text: 'nodeText',
    child: 'nodeChild',
  };
  const iconMapping: IconMappingType = {
    Warning,
    WarningOutline,
    FeaturedPlayListOutline,
    FeaturedPlayList,
    OfflineBoltOutline,
    OfflineBolt,
    Build,
    BuildOutline,
  };

  // Modified handleNodeSelect function
  const handleNodeSelect = (args: NodeSelectArgs) => {
    // Assuming args has a node or item property that gives you the selected node's details
    const selectedNode = args.nodeData;
    console.log('Selected node text:', selectedNode.text);
    // You can access other properties of the node as needed
  };

  const getNodeIcon = (iconName: string, color: string | undefined) => {
    // Get the component from the mapping object using the iconName
    const IconComponent = iconMapping[iconName];

    // Check if the IconComponent exists to avoid rendering errors
    if (!IconComponent) {
      console.warn(`Icon "${iconName}" not found.`);
      return null; // or return a default icon
    }
    return (
      <IconComponent className={'w-[21px] h-[30px]'} style={{ color: color }} />
    );
  };

  const nodeTemplate = data => {
    const image = '/' + data.image + '.png';

    return (
      <div className="flex gap-2">
        {data.icon && getNodeIcon(data.icon, data.iconColor)}
        {
          // eslint-disable-next-line @next/next/no-img-element
          data.image && (
            <img src={image} alt={data.image} className="img-small" />
          )
        }
        <span style={{ color: data.textColor }}>{data.nodeText}</span>
        {/* <span>{data.nodeText}</span> */}
      </div>
    );
  };

  return (
    <TreeViewComponent
      id="treeview"
      ref={treeViewRef} // Attach the ref to the TreeViewComponent
      fields={fields}
      nodeTemplate={nodeTemplate}
      nodeSelected={handleNodeSelect} // Assuming the event is named nodeSelected
    />
  );
};
