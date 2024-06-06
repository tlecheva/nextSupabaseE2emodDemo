import {
    ColumnChooser, ColumnDirective, ColumnsDirective, Search,
    ExcelExport, Print, ColumnMenu, Filter, Group, Grid, GridComponent, Inject,
    Page, Reorder, Sort, Selection, Resize, Toolbar,
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod_dev, useTableHeaders } from '@/lib/initSupabase';
import { ItemModel } from '@syncfusion/ej2-react-navigations';

type Changes = Database['e2emod_dev']['Tables']['change']['Row'];

function Changes() {
    const tableHeaders = useTableHeaders()
    const [dataChanges, setDataChanges] = React.useState<Changes[]>([])

    let grid: Grid | null;
    const dataBound = () => {
        if (grid) {
            grid.autoFitColumns();
        }
    };
    type ToolbarItem = string | ItemModel
    const toolbarOptions: ToolbarItem[] = [
        { text: 'Search', align: 'Left' },
        { text: 'ColumnChooser', align: 'Left' },
        { text: '|', width: 10, disabled: true },
        'ExcelExport',
        'CsvExport',
        'Print',
        // { type: 'Separator', width: 75 },
        // {
        //     text: 'Export',
        //     // tooltipText: 'Export',
        //     prefixIcon: 'e-export',
        //     align: 'Left',
        //     items: [
        //         { text: 'Export to Excel', id: 'ExcelExport' },
        //         { text: 'Export to PDF', id: 'PdfExport' },
        //         { text: 'Export to Csv', id: 'CsvExport' },
        //     ]
        // },
    ]
    const toolbarClick = (args: { item: { id: string | string[] } }) => {
        if (grid && args.item.id.includes('csvexport')) {
            const excelExportProperties = {
                enableFilter: true,
                fileName: 'Changes.csv'
            };
            grid.csvExport(excelExportProperties);
        }
        else if (grid && args.item.id.includes('excelexport')) {
            const excelExportProperties = {
                enableFilter: true,
                fileName: 'Changes.xlsx'
            };
            grid.excelExport(excelExportProperties);
        }
    };

    const loadChanges = async () => {
        const { data, error } = await supabase_e2emod_dev
            .from('change')
            .select('*')  // TODO: shall restricted to default columns
        console.log("🚀 ~ loadChanges ~ data:", data)

        if (error) console.log('error', error)
        else {
            setDataChanges(data as Changes[])
        }
    }
    React.useEffect(() => {
        if (dataChanges.length === 0) loadChanges()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pageOptions = {
        pageSize: dataChanges.length || 10,
        pageSizes: ['10', '20', '100', 'All']
    };

    if (dataChanges.length === 0)
        return (<div>Loading...</div>)

    return (
        <div className="absolute top-20 mt-5">

            <GridComponent dataSource={dataChanges} allowFiltering={true}
                allowGrouping={true}
                allowExcelExport={true} toolbarClick={toolbarClick}
                allowSorting={true} showColumnMenu={true} allowReordering={true}
                allowResizing={true}
                allowPaging={true} pageSettings={pageOptions}  // only kept to display the number of rows
                allowSelection={true} dataBound={dataBound} ref={g => grid = g} showColumnChooser={true}
                toolbar={toolbarOptions}
                enableStickyHeader={true}
                height='calc(100vh - 300px)'   // mandatory to set height for enableStickyHeader
            >
                <Inject services={[Toolbar, Resize, Filter, Page, Search, Print, ExcelExport,
                    ColumnMenu, Group, ColumnChooser, Reorder, Sort, Selection]} />
                <ColumnsDirective>
                    {tableHeaders && tableHeaders.map((data) => {
                        const { list_of_changes_order, db_column, label } = data
                        return <ColumnDirective
                            key={list_of_changes_order}
                            field={db_column || undefined}
                            headerText={label || undefined}
                            headerTextAlign='Center'
                            minWidth='50' />

                    })}
                </ColumnsDirective>
            </GridComponent>
        </div>
    );

};

export default Changes;
