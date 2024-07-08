import {
  GanttComponent,
  Inject,
  Edit,
  Filter,
  Sort,
  Selection,
} from '@syncfusion/ej2-react-gantt';
import { projectResources, data } from './MasterScheduleData';

export function MasterSchedule({ selection }: { selection: string }) {
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    duration: 'Duration',
    progress: 'Progress',
    child: 'subtasks',
    dependency: 'Predecessor',
    resourceInfo: 'resources',
  };
  const labelSettings: any = {
    rightLabel: 'resources',
  };
  const editSettings: any = {
    allowEditing: true,
    editMode: 'Auto',
    allowTaskbarEditing: true,
  };
  const resourceFields: any = {
    id: 'resourceId',
    name: 'resourceName',
  };

  return (
    <div className="ml-5">
      <h2>{selection ? selection : 'Export CM track'}</h2>
      <GanttComponent
        dataSource={data}
        allowFiltering={true}
        allowSorting={true}
        allowSelection={true}
        taskFields={taskFields}
        editSettings={editSettings}
        labelSettings={labelSettings}
        resourceFields={resourceFields}
        resources={projectResources}
      >
        <Inject services={[Edit, Filter, Selection, Sort]} />
      </GanttComponent>
    </div>
  );
}
