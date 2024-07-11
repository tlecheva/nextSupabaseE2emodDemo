import { useState, useRef, useEffect } from 'react';
import {
  GanttComponent,
  Inject,
  Edit,
  Filter,
  Sort,
  Selection,
  Toolbar,
  Resize,
} from '@syncfusion/ej2-react-gantt';
import { projectResources, dataRaw } from './MasterScheduleData';
import { ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-grids';

export function MasterSchedule({ selection }: { selection: string }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const ganttRef = useRef(null);

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
    baselineStartDate: 'BaselineStartDate',
    baselineEndDate: 'BaselineEndDate',
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
    const color = args.data.taskData.Color;
    const taskName = args.data.taskData.TaskName;
    const cells = args.row.querySelectorAll('td.e-rowcell');
    if (cells.length > 1) {
      cells[1].style.color = color; // Color for taskName
      cells[1].style.fontSize = 'Medium';
    }
    if (args.data.taskData.TaskName?.includes('Challenged')) {
      args.row.classList.add('gantt-challenged-task-row');
    }
  }

  const CHALENGED = 'Challenged';

  const queryTaskbarInfo = args => {
    let taskName = args.data.TaskName;
    if (taskName.includes(CHALENGED)) {
      // taskName = '__ ' + CHALENGED + '__';
      // args.data.TaskName = '__' + CHALENGED + '__';
      const rowElement = args.rowElement;
      const chartRowElement = rowElement.closest('.e-chart-row');
      chartRowElement.style.backgroundColor = 'lightgoldenrodyellow'; // Change 'red' to your desired color
    }
  };

  const toolbarOptions = [
    'ZoomIn',
    'ZoomOut',
    'ZoomToFit',
    'ExpandAll',
    'CollapseAll',
  ];

  function dataBound(args: any) {
    if (ganttRef.current) (ganttRef.current as GanttComponent).fitToProject();
  }

  // To prevent Gantt popup error due to unknow gant height
  useEffect(() => {
    const handleResize = () => {
      if (ganttRef.current) {
        console.log(
          '🚀 ~ handleResize ~ anttRef.current.height:',
          ganttRef.current?.height,
        );
        if (!ganttRef.current.height)
          ganttRef.current.height = `${window.innerHeight + 200}px `;
        setIsDataLoaded(true);
      } else {
        setIsDataLoaded(false);
        setTimeout(() => {
          setIsDataLoaded(true);
        }, 200);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (!isDataLoaded) return <p>'Gantt Loading...'</p>;

  return (
    <div className="ml-5">
      <h2>{selection ? selection : 'Export CM track'}</h2>
      <GanttComponent
        ref={ganttRef}
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
        allowResizing={true}
        renderBaseline={true}
        baselineColor="yellow"
        queryTaskbarInfo={queryTaskbarInfo}
      >
        <ColumnsDirective>
          <ColumnDirective field="TaskID" headerText="Id" />
          <ColumnDirective
            field="TaskName"
            headerText="Task Name"
            width="250"
          />
          <ColumnDirective field="StartDate" headerText="Start Date" />
          <ColumnDirective field="EndDate" headerText="End Date" />
          <ColumnDirective field="Duration" headerText="Duration" />
          <ColumnDirective field="Progress" headerText="Progress" />
        </ColumnsDirective>
        <Inject services={[Edit, Filter, Selection, Sort, Toolbar, Resize]} />
      </GanttComponent>
    </div>
  );
}
