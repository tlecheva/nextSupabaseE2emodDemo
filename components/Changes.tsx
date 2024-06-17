import {
    ColumnChooser, ColumnDirective, ColumnsDirective, Search,
    ExcelExport, Print, ColumnMenu, Filter, Group, Grid, GridComponent, Inject,
    Page, Reorder, Sort, Selection, Resize, Toolbar, Freeze, Edit
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod } from '@/lib/initSupabase';
import { ItemModel } from '@syncfusion/ej2-react-navigations';
import { useTableContent, useTableHeaders } from '@/lib/changeDbCalls';
import { useRouter } from 'next/navigation';

type Changes = Database['e2emod_dev']['Tables']['change']['Row'];

function Changes() {
    const grid = React.useRef<Grid | null>(null);
    const [frozenColumns, setFrozenColumns] = React.useState<number>(4);
    const tableHeaders = useTableHeaders()
    const [tableContent, defaultLoadedChanges] = useTableContent(grid)
    const router = useRouter()

    const dataBound = () => {
        grid?.current?.autoFitColumns();
    };
    type ToolbarItem = string | ItemModel
    const toolbarOptions: ToolbarItem[] = [
        { text: ' + ', tooltipText: 'Add one frozen column', id: 'toolbar+' },
        { text: ' - ', tooltipText: 'Remove one frozen column', id: 'toolbar-' },
        { text: 'Search', align: 'Left' },
        { text: 'ColumnChooser', align: 'Left' },
        // { text: '|', width: 10, disabled: true },
        { type: 'Separator', width: 75 },
        'ExcelExport',
        'CsvExport',
        'Print',
        // { type: 'Separator', width: 75 },
        // {
        //     text: 'Export',
        //     tooltipText: 'Export',
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
        if (grid && args.item.id === 'toolbar+') {
            setFrozenColumns(frozenColumns + 1)

        }
        else if (grid && args.item.id === 'toolbar-') {
            setFrozenColumns(frozenColumns - 1)
        }
        else if (grid && args.item.id.includes('csvexport')) {
            const excelExportProperties = {
                enableFilter: true,
                fileName: 'Changes.csv'
            };
            grid?.current?.csvExport(excelExportProperties);
        }
        else if (grid && args.item.id.includes('excelexport')) {
            const excelExportProperties = {
                enableFilter: true,
                fileName: 'Changes.xlsx'
            };
            grid?.current?.excelExport(excelExportProperties);
        }
    };

    const pageOptions = {
        pageSize: tableContent.length || defaultLoadedChanges,
        pageSizes: ['10', '20', '100', 'All']
    };

    console.log("🚀 ~ Changes ~ tableContent, tableHeaders:", tableContent?.length, tableContent, tableHeaders?.length, tableHeaders)
    if (!tableContent || tableContent.length === 0 || tableHeaders.length === 0)
        return (<div>Loading...</div>)

    const editOptions = { allowEditing: true, showConfirmDialog: false, mode: 'Normal' };
    const onDoubleClick = (args: { rowData: Changes }) => {
        const query = Object.entries(args?.rowData)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
        router.push(`/editChange?${query}`)
    }

    /////////////////

    return (
        <div className="absolute top-20 mt-5" style={{ overflowX: 'auto' }}>
            <GridComponent
                editSettings={editOptions}
                recordDoubleClick={onDoubleClick}
                frozenColumns={frozenColumns} 
                dataSource={tableContent}
                allowFiltering={true}
                allowGrouping={true}
                toolbar={toolbarOptions}
                allowExcelExport={true}
                toolbarClick={toolbarClick}
                allowSorting={true}
                showColumnMenu={true}
                allowReordering={true}
                allowResizing={true}
                allowPaging={true}
                pageSettings={pageOptions}  // only kept to display the number of rows
                allowSelection={true}
                dataBound={dataBound}
                ref={g => grid.current = g}
                showColumnChooser={true}
                allowTextWrap={true}
                enableStickyHeader={true}
                height='calc(100vh - 300px)'   // mandatory to set height for enableStickyHeader
                width='calc(100vw - 15px)'
            >
                <Inject services={[Edit, Toolbar, Resize, Filter, Page, Search, Print, ExcelExport,
                    Freeze, ColumnMenu, Group, ColumnChooser, Reorder, Sort, Selection]} />
                <ColumnsDirective>
                    {tableHeaders && tableHeaders.
                        map((data) => {
                            const { list_of_changes_order, db_column, label, format } = data
                            return <ColumnDirective
                                key={list_of_changes_order}
                                isPrimaryKey={label === 'ID'} 
                                field={db_column || undefined}
                                headerText={label || undefined}
                                headerTextAlign='Center'
                                type={format ? format : undefined} 
                                visible={list_of_changes_order !== -1}
                                minWidth={50}
                                maxWidth={800} />

                        })}
                </ColumnsDirective>
            </GridComponent>
        </div>
    );

};

export default Changes;
