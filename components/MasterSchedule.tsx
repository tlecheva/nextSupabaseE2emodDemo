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
  PdfExport,
  ToolbarItem,
  Gantt,
} from '@syncfusion/ej2-react-gantt';
import { projectResources, dataRaw } from './MasterScheduleData';
import { ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-react-grids';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-react-gantt/styles/material.css';

export function MasterSchedule({ selection }: { selection: string }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const CHALENGED = 'Challenged';
  let ganttInstance: GanttComponent | null = null;

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

  const queryTaskbarInfo = (args: {
    data: { TaskName: any };
    rowElement: any;
  }) => {
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
    'PdfExport',
    {
      text: CHALENGED,
      tooltipText: 'Gannt Challenged by Customer',
      // id: 'CHALENGED',
      prefixIcon: 'e-chart-2d-clustered-bar',
    },
  ];

  function toolbarClick(args: { item: { text: string; id: string } }) {
    console.log('🚀 ~ toolbarClick ~ args.item:', args.item);
    if (args.item.text === 'PDF export') {
      if (ganttInstance) ganttInstance.pdfExport();
    }

    if (args.item.text === CHALENGED) {
      console.log('🚀 ~ toolbarClick ~ args:', args, args);
    }
  }

  function dataBound() {
    console.log('🚀 ~ dataBound ~ dataBound:', dataBound);
    if (ganttInstance) (ganttInstance as GanttComponent).fitToProject();
  }
  // To prevent Gantt popup error due to unknow gant height
  const handleResize = () => {
    if (ganttInstance) {
      console.log(
        '🚀 ~ handleResize ~ anttRef.current.height:',
        ganttInstance?.height,
      );
      if (!ganttInstance.height) {
        ganttInstance.height = `${window.innerHeight + 200}px `;
        console.log(
          '🚀 ~ handleResize ~ `${window.innerHeight + 200}px `:',
          `${window.innerHeight + 200}px `,
        );
      }
      setIsDataLoaded(true);
    } else {
      setIsDataLoaded(false);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 300);
    }
  };
  useEffect(() => {
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
        allowResizing={true}
        renderBaseline={true}
        baselineColor="green"
        queryTaskbarInfo={queryTaskbarInfo}
        allowPdfExport={true}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          <ColumnDirective field="TaskID" headerText="Id" width="80" />
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
        <Inject
          services={[Edit, Filter, Selection, Sort, Toolbar, Resize, PdfExport]}
        />
      </GanttComponent>
    </div>
  );
}
