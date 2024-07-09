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

export function MasterSchedule({ selection }: { selection: string }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const ganttRef = useRef(null);

  // let ganttInstance: GanttComponent | null;
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
    const color = args.data.taskData.Color;
    const cells = args.row.querySelectorAll('td.e-rowcell');
    if (cells.length > 1) {
      cells[1].style.color = color; // Color for taskName
      cells[1].style.fontSize = 'Medium';
    }
  }
  const toolbarOptions = ['ZoomIn', 'ZoomOut', 'ZoomToFit'];
  function dataBound(args: any) {
    if (ganttRef.current) (ganttRef.current as GanttComponent).fitToProject();
  }

  // useEffect(() => {
  //   // Simulate data loading
  //   // loadData().then(() => {
  //   // Initialize Gantt chart or perform operations that depend on loaded data
  //   // });
  //   setIsDataLoaded(true);
  //   // Initialize Gantt chart or perform operations that depend on loaded data

  //   const handleResize = () => {
  //     setIsDataLoaded(true);
  //     ganttRef.current.style.height = `${window.innerHeight * 0.75}px`;

  //     // console.log(
  //     //   '🚀 ~ handleResize ~ handleResize ganttInstance',
  //     //   handleResize,
  //     //   ganttInstance,
  //     // );
  //     // if (ganttRef.current && isDataLoaded) {
  //     //   // Safely call methods on your Gantt instance
  //     //   ganttRef.current.windowResize();
  //     //   loadData().then(() => {
  //     //     setIsDataLoaded(false);
  //     //     // Initialize Gantt chart or perform operations that depend on loaded data
  //     //   });
  //     // }
  //     if (ganttRef.current) {
  //       // Safely call methods on your Gantt instance
  //       ganttRef.current.windowResize();
  //       loadData().then(() => {
  //         setIsDataLoaded(false);
  //         // Initialize Gantt chart or perform operations that depend on loaded data
  //       });
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  // async function loadData() {
  //   // Your data loading logic here
  //   return new Promise(resolve => setTimeout(resolve, 1000)); // Example delay
  // }
  // if (!isDataLoaded) return <p>'Gantt Loading...'</p>;
  useEffect(() => {
    const handleResize = () => {
      // console.log('🚀 ~ handleResize ~ ganttRef.current:', ganttRef.current);
      if (ganttRef.current) {
        // Example: Set the height to 75% of the window height
        // ganttRef.current.style.height = `${window.innerHeight * 0.75}px`;
      }
    };

    // Set initial height
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize); // to avoid console.log Gantt error when resizing window

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <div className="ml-5">
      <h2>{selection ? selection : 'Export CM track'}</h2>
      {/* <ErrorBoundary> */}
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
      >
        <Inject services={[Edit, Filter, Selection, Sort, Toolbar, Resize]} />
      </GanttComponent>
      {/* </ErrorBoundary> */}
    </div>
  );
}
