import { ColumnChooser, ColumnDirective, ColumnsDirective, ColumnMenu, Filter, Group, Grid, GridComponent, Inject, Page, Reorder, PageSettingsModel, Sort, Selection, Resize, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod_dev, useTableHeaders } from '@/lib/initSupabase';

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
    const toolbarOptions = ['ColumnChooser'];

    // const supabase = useSupabaseClient<Database>()
    const loadChanges = async () => {
        const { data, error } = await supabase_e2emod_dev
            .from('change')
            .select('*')  // TODO: shall restricted to default columns
        console.log("🚀 ~ loadChanges ~ data:", data)
        if (error) console.log('error', error)
        else setDataChanges(data as Changes[])
    }
    React.useEffect(() => {
        console.log("🚀 ~ React.useEffect ~ supabase_e2emod_dev:", supabase_e2emod_dev?.auth?.admin, supabase_e2emod_dev)
        loadChanges()
    }, [])

    const pageOptions = {
        pageSizes: ['5', '10', '15', '20', 'All']
    };

    return (
        <div className="absolute top-20 mt-3">
            <GridComponent dataSource={dataChanges} allowFiltering={true} allowGrouping={true} allowSorting={true} showColumnMenu={true} allowReordering={true} allowResizing={true} allowPaging={true} pageSettings={pageOptions} allowSelection={true} dataBound={dataBound} ref={g => grid = g} showColumnChooser={true} toolbar={toolbarOptions}>
                <Inject services={[Resize, Filter, Page, Toolbar, ColumnMenu, Group, ColumnChooser, Reorder, Sort, Selection]} />
                <ColumnsDirective>
                    {tableHeaders && tableHeaders.map((key) => (
                        <ColumnDirective key={key.list_of_changes_order} field={key.db_column} headerText={key.label} headerTextAlign='Center' minWidth='50' />
                    ))}
                    {/* <ColumnDirective field='change_id' headerText='ID' width='120' textAlign="Left" />
                    <ColumnDirective field='cr_context' headerText='CR/Context' width='300' />
                    <ColumnDirective field='step_istep' headerText='Step/IStep' width='100' />
                    <ColumnDirective field='mp' headerText='MP#' width='100' />
                    <ColumnDirective field='mod' headerText='MOD#' width='100' />
                    <ColumnDirective field='title' headerText='MOD title' width='300' />
                    <ColumnDirective field='type' headerText='Type' width='100' />
                    <ColumnDirective field='origin' headerText='Origin' width='100' /> */}
                </ColumnsDirective>
            </GridComponent>
        </div>
    );

};

export default Changes;
