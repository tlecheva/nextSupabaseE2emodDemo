// 'use client'
import { getObject, FilterSettingsModel } from '@syncfusion/ej2-grids';
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
import { summaryRowData } from './PostsData';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '@/lib/schema'

type Changes = Database['public']['Tables']['airbus_sa_changes']['Row'];


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

    const updateHtmlContent = (newHtml: string) => {
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


function Posts() {
    const footerSum = (props: string) => {
        return <span>Minimum: {getObject('Min', props)}</span>;
    };
    const footerSum2 = (props: string) => {
        return <span>Maximum: {getObject('Max', props)}</span>;
    };
    function rating(props: { Rating: number }) {
        const value = props.Rating;
        return (
            <span>
                <RatingComponent value={props.Rating} itemsCount={3} cssClass='custom-fill' />
            </span>
        );
    }


    let treegrid: TreeGridComponent | null = null;
    const dataBound = () => {
        if (treegrid) {

            treegrid.autoFitColumns(['Title', 'Username']);
            treegrid.collapseAll();
            const lastRow = treegrid.getRows()[6];
            treegrid.expandRow(lastRow);
        }
    };

    const filterSettings: FilterSettingsModel = { type: 'Menu' };

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
export default Posts;
