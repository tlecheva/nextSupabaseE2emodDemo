import {
    ColumnChooser, ColumnDirective, ColumnsDirective, Search,
    ExcelExport, Print, ColumnMenu, Filter, Group, Grid, GridComponent, Inject,
    Page, Reorder, Sort, Selection, Resize, Toolbar, Freeze
} from '@syncfusion/ej2-react-grids';
import * as React from 'react';
import { Database } from '@/lib/schema_e2emod_dev'
import { supabase_e2emod } from '@/lib/initSupabase';
import { ItemModel, SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { useEditChangeHeader, useTableContent, useTableHeaders } from '@/lib/changeDbCalls';


import {
    Divider,
    Flex,
    SideNav,
    SideNavCategory,
    SideNavItem,
    SideNavSection,
    Typography,
} from "@airbus/components-react"

import {
    Menu
} from "@airbus/icons/react";


function EditChange() {
    const [page, setPage] = React.useState("Attributes");
    const [open, setOpen] = React.useState(true);
    return (
        <Flex style={{ height: 500, overflow: "hidden" }}>
            <SideNav theme="dark" aria-label="Main Navigation" open={open} >
                <Typography variant="h2" style={{ paddingLeft: "1rem" }}>
                    SideNav
                </Typography>
                <div className="self-center" onClick={() => setOpen(false)} >
                    <Menu />
                </div>
                <SideNavSection style={{ flex: 1 }}>
                    <SideNavItem
                        selected={page === "Attributes"}
                        onSelected={() => setPage("Attributes")}
                    >
                        Attributes
                    </SideNavItem>
                    <SideNavItem
                        selected={page === "Attributes"}
                        onSelected={() => setPage("Attributes")}
                    >
                        Attributes
                    </SideNavItem>
                    <SideNavItem
                        disabled
                        selected={page === "Multi-standard"}
                        onSelected={() => setPage("Multi-standard")}
                    >
                        Multi-standard
                    </SideNavItem>
                    <SideNavItem
                        selected={page === "..."}
                        onSelected={() => setPage("...")}
                    >
                        ...
                    </SideNavItem>
                </SideNavSection>
                <Divider inset />
                <SideNavSection>
                    <SideNavItem
                        href="goto.airbus.corp/design-system"
                        onSelected={() => { console.log("onSelected") }}
                    >
                        External Link 1
                        {/* <LaunchIcon /> */}
                    </SideNavItem>
                    <SideNavItem
                        href="goto.airbus.corp/swe-guidelines"
                        onSelected={() => { console.log("onSelected") }}
                    >
                        External Link 2
                        {/* <LaunchIcon /> */}
                    </SideNavItem>
                </SideNavSection>
            </SideNav>
            <main style={{ padding: "0.25rem 2rem" }}>
                <Typography variant="h2">{page}</Typography>
                <p>Sample page content</p>
            </main>
        </Flex>
    );
}

// function EditChange() {
//     const tableHeaders = useEditChangeHeader()

//     let dockBar;
//     // Toggle(Open/Close) the Sidebar
//     function toggleClick() {
//         dockBar.toggle();
//     }
//     return (<div className="control-section">
//         <div id="sidebar-wrapper">
//             {/* Initializing the Sidebar component */}
//             <SidebarComponent id="dockSidebar" ref={Sidebar => dockBar = Sidebar} enableDock={true} dockSize="72px" width="220px">
//                 <div className="dock">
//                     <ul>
//                         <li className="sidebar-item" id="toggle" onClick={toggleClick}>
//                             <span className="e-icons expand" />
//                             <span className="e-text" title="menu">Menu</span>
//                         </li>
//                         <li className="sidebar-item">
//                             <span className="e-icons home" />
//                             <span className="e-text" title="home">Home</span>
//                         </li>
//                         <li className="sidebar-item">
//                             <span className="e-icons profile" />
//                             <span className="e-text" title="profile">Profile</span>
//                         </li>
//                         <li className="sidebar-item">
//                             <span className="e-icons info" />
//                             <span className="e-text" title="info">Info</span>
//                         </li>
//                         <li className="sidebar-item">
//                             <span className="e-icons settings" />
//                             <span className="e-text" title="settings">Settings</span>
//                         </li>
//                     </ul>
//                 </div>
//             </SidebarComponent>
//             <div id="main-content container-fluid col-md-12 ">
//                 <div className="title">Main content</div>
//                 <div className="sub-title"> Click the expand icon to open and collapse icons to close the Sidebar</div>
//             </div>
//         </div>
//     </div>);

    // const grid = React.useRef<Grid | null>(null);
    // const defaultLoadedEditChange = 20   // first set of load to quickly display a table
    // const tableContent = useTableContent(grid, defaultLoadedEditChange)

    // const dataBound = () => {
    //     grid?.current?.autoFitColumns();
    // };
    // type ToolbarItem = string | ItemModel
    // const toolbarOptions: ToolbarItem[] = [
    //     { text: 'Search', align: 'Left' },
    //     { text: 'ColumnChooser', align: 'Left' },
    //     { text: '|', width: 10, disabled: true },
    //     'ExcelExport',
    //     'CsvExport',
    //     'Print',
    //     // { type: 'Separator', width: 75 },
    //     // {
    //     //     text: 'Export',
    //     //     tooltipText: 'Export',
    //     //     prefixIcon: 'e-export',
    //     //     align: 'Left',
    //     //     items: [
    //     //         { text: 'Export to Excel', id: 'ExcelExport' },
    //     //         { text: 'Export to PDF', id: 'PdfExport' },
    //     //         { text: 'Export to Csv', id: 'CsvExport' },
    //     //     ]
    //     // },
    // ]
    // const toolbarClick = (args: { item: { id: string | string[] } }) => {
    //     if (grid && args.item.id.includes('csvexport')) {
    //         const excelExportProperties = {
    //             enableFilter: true,
    //             fileName: 'EditChange.csv'
    //         };
    //         grid?.current?.csvExport(excelExportProperties);
    //     }
    //     else if (grid && args.item.id.includes('excelexport')) {
    //         const excelExportProperties = {
    //             enableFilter: true,
    //             fileName: 'EditChange.xlsx'
    //         };
    //         grid?.current?.excelExport(excelExportProperties);
    //     }
    // };

    // const pageOptions = {
    //     pageSize: tableContent.length || defaultLoadedEditChange,
    //     pageSizes: ['10', '20', '100', 'All']
    // };

    // console.log("🚀 ~ EditChange ~ tableContent, tableHeaders:", tableContent.length, tableContent, tableHeaders?.length, tableHeaders)
    // // if (tableContent.length === 0 || tableHeaders.length === 0)
    // //     return (<div>Loading...</div>)

    // return (
    //     <div className="absolute top-20 mt-5" style={{ overflowX: 'auto' }}>

    //         <GridComponent
    //             // frozenColumns={1}  // does not work, left column is not sticked
    //             dataSource={tableContent}
    //             allowFiltering={true}
    //             allowGrouping={true}
    //             toolbar={toolbarOptions}
    //             allowExcelExport={true} toolbarClick={toolbarClick}
    //             allowSorting={true} showColumnMenu={true} allowReordering={true}
    //             allowResizing={true}
    //             allowPaging={true} pageSettings={pageOptions}  // only kept to display the number of rows
    //             allowSelection={true}
    //             dataBound={dataBound} ref={g => grid.current = g}
    //             showColumnChooser={true}
    //             // enableStickyHeader={true}
    //             height='calc(100vh - 300px)'   // mandatory to set height for enableStickyHeader
    //         >
    //             <Inject services={[Toolbar, Resize, Filter, Page, Search, Print, ExcelExport,
    //                 Freeze,
    //                 ColumnMenu,
    //                 Group,
    //                 ColumnChooser, Reorder, Sort, Selection]} />
    //             <ColumnsDirective>
    //                 {tableHeaders && tableHeaders.
    //                     // filter(header => header.list_of_EditChange_order !== "-1").
    //                     map((data) => {
    //                         const { list_of_EditChange_order, db_column, label } = data
    //                         return <ColumnDirective
    //                             key={list_of_EditChange_order}
    //                             field={db_column || undefined}
    //                             headerText={label || undefined}
    //                             headerTextAlign='Center'
    //                             visible={list_of_EditChange_order !== -1}
    //                             minWidth={50}
    //                             maxWidth={600} />

    //                     })}
    //             </ColumnsDirective>
    //         </GridComponent>
    //     </div>
    // );


export default EditChange;
