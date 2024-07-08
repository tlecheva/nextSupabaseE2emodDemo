import {
  GanttComponent,
  Inject,
  Edit,
  Filter,
  Sort,
  Selection,
  Toolbar,
} from '@syncfusion/ej2-react-gantt';
import { projectResources, dataRaw } from './MasterScheduleData';

export function MasterSchedule({ selection }: { selection: string }) {
  let ganttInstance: GanttComponent | null;
  const taskFields: any = {
    id: 'TaskID',
    name: 'TaskName',
    duration: 'Duration',
    startDate: 'StartDate',
    endDate: 'EndDate',
    progress: 'Progress',
    child: 'subtasks',
    dependency: 'Predecessor',
    resourceInfo: 'resources',
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
  const rightLabel = (task: { Duration: number }) => {
    const duration = Math.round(task.Duration);
    return duration ? `${duration} days` : '';
  };
  const labelSettings = {
    leftLabel: 'TaskName',
    // rightLabel: '${taskData.TaskName} - ${Progress}%',
    rightLabel: (task: { Duration: number }) => rightLabel(task),
    // rightLabel: 'Duration',
    taskLabel: '${Progress}%',
  };
  function customizeCell(args: {
    column: { field: string };
    data: { Progress: number };
    cell: { style: { backgroundColor: string } };
  }) {
    if (args.column.field == 'Progress') {
      if (args.data.Progress && args.data.Progress < 60)
        args.cell.style.backgroundColor = 'lightgreen';
      else args.cell.style.backgroundColor = 'yellow';
    }
  }
  function rowDataBound(args: any) {
    // args.data
    const color = args.data.taskData.Color;
    const cells = args.row.querySelectorAll('td.e-rowcell');
    if (cells.length > 1) {
      cells[1].style.color = color; // Color for taskName
      cells[1].style.fontSize = 'Medium';
    }
  }
  const toolbarOptions = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
  function dataBound(args: any) {
    if (ganttInstance) ganttInstance.fitToProject();
  }
  return (
    <div className="ml-5">
      <h2>{selection ? selection : 'Export CM track'}</h2>
      <GanttComponent
        ref={gantt => (ganttInstance = gantt)}
        dataBound={dataBound}
        dataSource={dataRaw}
        toolbar={toolbarOptions}
        rowDataBound={rowDataBound}
        queryCellInfo={customizeCell}
        labelSettings={labelSettings}
        allowFiltering={true}
        allowSorting={true}
        allowSelection={true}
        taskFields={taskFields}
        editSettings={editSettings}
        resourceFields={resourceFields}
        resources={projectResources}
      >
        <Inject services={[Edit, Filter, Selection, Sort, Toolbar]} />
      </GanttComponent>
    </div>
  );
}
