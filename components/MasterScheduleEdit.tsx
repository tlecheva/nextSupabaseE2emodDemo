import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import {
  GanttComponent,
  EditDialogFieldsDirective,
  DayMarkers,
  EditDialogFieldDirective,
  Inject,
  Edit,
  Selection,
  Toolbar,
  ColumnsDirective,
  ColumnDirective,
  EventMarkersDirective,
  EventMarkerDirective,
} from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './MasterScheuleEditData';

export const MasterScheduleEdit = () => {
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    notes: 'info',
    resourceInfo: 'resources',
  };
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName',
  };
  const editSettings: any = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };
  // const splitterSettings: any = {
  //     position: "35%"
  // };
  const projectStartDate: Date = new Date('03/25/2024');
  const projectEndDate: Date = new Date('07/28/2024');
  const gridLines: any = 'Both';
  const toolbar: any = [
    'Add',
    'Edit',
    'Update',
    'Delete',
    'Cancel',
    'ExpandAll',
    'CollapseAll',
    'Indent',
    'Outdent',
  ];
  const timelineSettings: any = {
    topTier: {
      unit: 'Week',
      format: 'MMM dd, y',
    },
    bottomTier: {
      unit: 'Day',
    },
  };
  const labelSettings: any = {
    leftLabel: 'TaskName',
    rightLabel: 'resources',
  };
  const eventMarkerDay1: Date = new Date('4/17/2024');
  const eventMarkerDay2: Date = new Date('5/3/2024');
  const eventMarkerDay3: Date = new Date('6/7/2024');
  const eventMarkerDay4: Date = new Date('7/16/2024');

  const totalItems = editingData.reduce((acc, task) => {
    // Count the task itself
    let count = 1;
    // Add the count of subtasks if any
    if (task.subtasks && Array.isArray(task.subtasks)) {
      count += task.subtasks.length;
    }
    return acc + count;
  }, 0);

  const heightPerItem = 50;
  const totalHeight = totalItems * heightPerItem;

  return (
    <div className="control-pane ml-5">
      <div className="control-section">
        <GanttComponent
          id="Editing"
          dataSource={editingData}
          dateFormat={'MMM dd, y'}
          treeColumnIndex={1}
          allowSelection={true}
          showColumnMenu={false}
          highlightWeekends={true}
          allowUnscheduledTasks={true}
          projectStartDate={projectStartDate}
          projectEndDate={projectEndDate}
          taskFields={taskFields}
          timelineSettings={timelineSettings}
          labelSettings={labelSettings}
          //splitterSettings={splitterSettings}
          // height={totalHeight + 'px'}
          editSettings={editSettings}
          gridLines={gridLines}
          toolbar={toolbar}
          resourceFields={resourceFields}
          resources={editingResources}
        >
          <ColumnsDirective>
            <ColumnDirective field="TaskID" width="80"></ColumnDirective>
            <ColumnDirective
              field="TaskName"
              headerText="Job Name"
              width="250"
              clipMode="EllipsisWithTooltip"
            ></ColumnDirective>
            <ColumnDirective field="StartDate"></ColumnDirective>
            <ColumnDirective field="Duration"></ColumnDirective>
            <ColumnDirective field="Progress"></ColumnDirective>
            <ColumnDirective field="Predecessor"></ColumnDirective>
          </ColumnsDirective>
          <EditDialogFieldsDirective>
            <EditDialogFieldDirective
              type="General"
              headerText="General"
            ></EditDialogFieldDirective>
            <EditDialogFieldDirective type="Dependency"></EditDialogFieldDirective>
            <EditDialogFieldDirective type="Resources"></EditDialogFieldDirective>
            <EditDialogFieldDirective type="Notes"></EditDialogFieldDirective>
          </EditDialogFieldsDirective>
          <EventMarkersDirective>
            <EventMarkerDirective
              day={eventMarkerDay1}
              label="Project approval and kick-off"
            ></EventMarkerDirective>
            <EventMarkerDirective
              day={eventMarkerDay2}
              label="Foundation inspection"
            ></EventMarkerDirective>
            <EventMarkerDirective
              day={eventMarkerDay3}
              label="Site manager inspection"
            ></EventMarkerDirective>
            <EventMarkerDirective
              day={eventMarkerDay4}
              label="Property handover and sign-off"
            ></EventMarkerDirective>
          </EventMarkersDirective>
          <Inject services={[Edit, Selection, Toolbar, DayMarkers]} />
        </GanttComponent>
        <div style={{ float: 'right', margin: '10px' }}>
          Source:
          <a href="https://en.wikipedia.org/wiki/Construction" target="_blank">
            https://en.wikipedia.org/
          </a>
        </div>
      </div>
    </div>
  );
};
