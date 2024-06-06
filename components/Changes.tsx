import { ColumnChooser, ColumnDirective, ColumnsDirective, Grid, GridComponent, Inject, Page, PageSettingsModel, Resize, Toolbar } from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/lib/schema'

type Changes = Database['public']['Tables']['airbus_sa_changes']['Row'];

function Changes() {

    const [dataChanges, setDataChanges] = React.useState<Changes[]>([])

    let grid: Grid | null;

    const dataBound = () => {
        if (grid) {
            grid.autoFitColumns();
        }
    };
    const toolbarOptions = ['ColumnChooser'];

    const supabase = useSupabaseClient<Database>()

    React.useEffect(() => {
        const loadChanges = async () => {
            const { data: airbus_sa_changes, error } = await supabase
                .from('airbus_sa_changes')
                .select('*')
            console.log("🚀 ~ loadChanges ~ data:", airbus_sa_changes)
            if (error) console.log('error', error)
            else setDataChanges(airbus_sa_changes)
        }
        loadChanges()
    }, [supabase])

    const pageOptions = {
        pageSizes: ['5', '10', '15', '20', 'All']
    };
    return (
        <div className="relative top-20 mt-3 overflow-auto">
            <GridComponent dataSource={dataChanges} allowResizing={true} allowPaging={true}
                pageSettings={pageOptions} dataBound={dataBound} ref={g => grid = g} showColumnChooser={true}
                toolbar={toolbarOptions} >
                <Inject services={[Resize, Page, Toolbar, ColumnChooser]} />
                <ColumnsDirective>
                    <ColumnDirective field='id' headerText='ID' width='120' textAlign="Right" />
                    <ColumnDirective field='cr_context_airbus' headerText='CR/Context' width='300' />
                    <ColumnDirective field='step_istep' headerText='Step/IStep' width='100' />
                    <ColumnDirective field='mp_airbus' headerText='MP#' width='100' />
                    <ColumnDirective field='mod_airbus' headerText='MOD#' width='100' />
                    <ColumnDirective field='title' headerText='MOD title' width='300' />
                    <ColumnDirective field='type' headerText='Type' width='100' />
                </ColumnsDirective>
            </GridComponent>
        </div>
    );
}

export default Changes;
