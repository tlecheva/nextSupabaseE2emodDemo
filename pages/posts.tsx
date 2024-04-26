// 'use client'
import { getObject } from '@syncfusion/ej2-grids';
import {
    Aggregate,
    AggregatesDirective,
    ColumnDirective,
    ColumnsDirective,
    TreeGridComponent,
    AggregateColumnDirective,
    AggregateColumnsDirective,
    AggregateDirective,
    Inject,
    Resize,
    Sort,
    Filter,
    ColumnMenu,
} from '@syncfusion/ej2-react-treegrid';

import { RatingComponent } from '@syncfusion/ej2-react-inputs';

import {
    RichTextEditorComponent,
    Toolbar,
    Image,
    Link,
    HtmlEditor,
    QuickToolbar,
} from '@syncfusion/ej2-react-richtexteditor';

import * as React from 'react';
import { summaryRowData } from './postsData';
import { registerLicense } from "@syncfusion/ej2-base";

if (!process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE) {
    throw new Error('NEXT_PUBLIC_SYNCFUSION_LICENSE should be set in .env file');
}
registerLicense(
    // create a .env file and add the license key inside it 
    // NEXT_PUBLIC_SYNCFUSION_LICENSE='your_license_key_here'
    process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE,
);

function RichPostContent({ Content }: { Content: any }) {
    let inlineMode = {
        enable: true,
        onSelection: true,
    };
    let toolbarSettings = {
        items: [
            'Bold',
            'Italic',
            'Underline',
            '|',
            'FontColor',
            'BackgroundColor',
            '|',
            'Image',
            'Alignments',
        ],
    };
    const editorRef = React.useRef(Content);

    const updateHtmlContent = (newHtml) => {
        editorRef.current.setHtml(newHtml);
    };

    const getHtmlContent = () => {
        return editorRef.current.getHtml();
    };

    return (
        <RichTextEditorComponent
            value={Content}
            inlineMode={inlineMode}
            toolbarSettings={toolbarSettings}
        >
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
        </RichTextEditorComponent>
    );
}


function App() {
    const footerSum = (props) => {
        return <span>Minimum: {getObject('Min', props)}</span>;
    };
    const footerSum2 = (props) => {
        return <span>Maximum: {getObject('Max', props)}</span>;
    };
    function rating(props) {
        return (
            <span>
                <RatingComponent value={props.Rating} itemsCount={3} cssClass='custom-fill' />
            </span>
        );
    }

    let treegrid;
    const dataBound = () => {
        if (treegrid) {

            treegrid.autoFitColumns(['Title', 'Username']);
            treegrid.collapseAll();
            const lastRow = treegrid.getRows()[6];
            treegrid.expandRow(lastRow);
        }
    };

    const filterSettings = { type: 'Menu' };

    return (
        <div className="absolute top-20 ml-10 mr-10">
            <RichPostContent Content="<p>UX _ Desing in Progress _ for <b>Posts</b> and comments</p>" />
            <TreeGridComponent
                dataSource={summaryRowData}
                treeColumnIndex={0}
                childMapping="children"
                allowResizing={true}
                dataBound={dataBound}
                ref={(g) => (treegrid = g)}
                allowTextWrap={true}
                allowFiltering={true}
                allowSorting={true}
                showColumnMenu={true}
                filterSettings={filterSettings}
                className="my-treegrid"
            >
                <ColumnsDirective>
                    <ColumnDirective field="Title" headerText="Post" textAlign="Left" width="120" />
                    <ColumnDirective
                        field="Username"
                        headerText="Username"
                        width="130"
                    />
                    <ColumnDirective field="Date" headerText="Date" width="90" />
                    <ColumnDirective
                        field="Content"
                        headerText="Content"
                        minWidth="280"
                        textAlign="Left"
                        template={RichPostContent}
                    />
                    <ColumnDirective
                        field="Rating"
                        headerText="Rating"
                        width="130"
                        textAlign="Right"
                        type="number"
                        template={rating}
                    />
                </ColumnsDirective>
                <AggregatesDirective>
                    <AggregateDirective showChildSummary={true}>
                        <AggregateColumnsDirective>
                            <AggregateColumnDirective
                                field="TotalUnits"
                                columnName="TotalUnits"
                                type="Min"
                                footerTemplate={footerSum}
                            />
                            <AggregateColumnDirective
                                field="Rating"
                                columnName="Rating"
                                type="Max"
                                footerTemplate={footerSum2}
                            />
                        </AggregateColumnsDirective>
                    </AggregateDirective>
                </AggregatesDirective>
                <Inject services={[Aggregate, Resize, Sort, Filter, ColumnMenu]} />
            </TreeGridComponent>
        </div >
    );
}
export default App;
