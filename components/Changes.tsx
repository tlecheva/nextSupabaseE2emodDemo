import {
    ColumnChooser, ColumnDirective, ColumnsDirective, Search,
    ExcelExport, Print, ColumnMenu, Filter, Group, Grid, GridComponent, Inject,
    Page, Reorder, Sort, Selection, Resize, Toolbar, Freeze,
    DetailRow
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod } from '@/lib/initSupabase';
import { ItemModel } from '@syncfusion/ej2-react-navigations';
import { useTableContent, useTableHeaders } from '@/lib/changeDbCalls';

type Changes = Database['e2emod_dev']['Tables']['change']['Row'];

function Changes() {
    const grid = React.useRef<Grid | null>(null);
    const tableHeaders = useTableHeaders()
    const [tableContent, defaultLoadedChanges] = useTableContent(grid)

    const dataBound = () => {
        grid?.current?.autoFitColumns();
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
        if (grid && args.item.id.includes('csvexport')) {
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

    const gridTemplate = (props) => {
        console.log("🚀 ~ gridTemplate ~ props:", props)
        // const src = props.EmployeeID + ".png";
        const renderingMode = 'Vertical';

        return (
            <GridComponent
                // frozenColumns={1}  // does not work, left column is not sticked
                enableAdaptiveUI={true}
                rowRenderingMode={renderingMode}
                dataSource={tableContent.filter((data) => data.change_id === props.change_id)}
                width='calc(100vw - 100px)'
                allowResizing={true}
            >
                <ColumnsDirective>
                    {tableHeaders && tableHeaders.
                        map((data) => {
                            const { list_of_changes_order, db_column, label } = data
                            return <ColumnDirective
                                key={list_of_changes_order}
                                field={db_column || undefined}
                                headerText={label || undefined}
                                headerTextAlign='Center'
                                visible={list_of_changes_order !== -1}
                                minWidth={50}
                                maxWidth={600} />

                        })}
                </ColumnsDirective>
            </GridComponent >
        )
    };

    return (
        <div className="absolute top-20 mt-5" style={{ overflowX: 'auto' }}>

            <GridComponent
                frozenColumns={1}  // does not work, left column is not sticked
                dataSource={tableContent}
                //detailTemplate={gridTemplate}
                allowFiltering={true}
                allowGrouping={true}
                toolbar={toolbarOptions}
                allowExcelExport={true} toolbarClick={toolbarClick}
                allowSorting={true} showColumnMenu={true} allowReordering={true}
                allowResizing={true}
                allowPaging={true} pageSettings={pageOptions}  // only kept to display the number of rows
                allowSelection={true}
                dataBound={dataBound} ref={g => grid.current = g}
                showColumnChooser={true}
                allowTextWrap={true}
                enableStickyHeader={true}
                height='calc(100vh - 300px)'   // mandatory to set height for enableStickyHeader
                width='calc(100vw - 15px)'
            >
                <Inject services={[Toolbar, Resize, Filter, Page, Search, Print, ExcelExport,
                    Freeze,
                    ColumnMenu,
                    Group,
                    ColumnChooser, Reorder, Sort, Selection, DetailRow]} />
                <ColumnsDirective>
                    {tableHeaders && tableHeaders.
                        map((data) => {
                            const { list_of_changes_order, db_column, label } = data
                            return <ColumnDirective
                                key={list_of_changes_order}
                                field={db_column || undefined}
                                headerText={label || undefined}
                                headerTextAlign='Center'
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
