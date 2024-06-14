import React, { useRef, useEffect } from "react"

import { MenuComponent, MenuItemModel, MenuEventArgs, ContextMenuComponent } from '@syncfusion/ej2-react-navigations';
import {
    CompareArrows
} from "@airbus/icons/react";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';


interface MyMenuEventArgs extends MenuEventArgs {
    parentObj?: {
        text: string;
    };
}

function CustomerMenu(props: { openCustomerMenu: boolean }) {
    const menuRef = React.useRef<MenuComponent>(null);
    const { openCustomerMenu } = props;
    let cMenu;

    const [customerProgram, setCustomerProgram] = React.useState<string>("Airbus / SA");
    function menuSelect(args: MyMenuEventArgs & { item: MyMenuEventArgs }) {
        const customer = args.item?.parentObj?.text;
        const program = args.item?.text;
        if (customer && !customer.includes("/")) {
            setCustomerProgram(customer + " / " + program);
        }
    }

    const handleClick = () => {
        if (openCustomerMenu && menuRef.current) {
            // Get the first menu item element
            const firstMenuItem = menuRef.current.element.querySelector('.e-menu-item');

            // Create a new mouse event
            const event = new MouseEvent('mouseover', {
                view: window,
                bubbles: true,
                cancelable: true,
            });

            // Dispatch the mouse event
            firstMenuItem?.dispatchEvent(event);
        }
    };
    // useEffect(() => {
    //     handleClick()
    // }, [openCustomerMenu]);


    const allCustomerProgramMenus: MenuItemModel[] = [
        {
            text: 'Airbus',
            // iconCss: 'em-icons e-file',
            iconCss: 'material-icons compare_arrows', // Add the icon class name here
            items: [
                {
                    text: 'SA', iconCss: 'material-icons compare_arrows', // Add the icon class name here
                },
                { text: 'LR' },
                { text: 'LA' },
                { text: 'ATR' },
                { text: '...' },
            ],
        },
        {
            text: 'Airbus Canada',
            iconCss: 'material-icons compare_arrows', // Add the icon class name here

            items: [
                { text: 'A220' },
            ],
        },
        {
            text: 'Bombardier',
            iconCss: 'material-icons compare_arrows', // Add the icon class name here

            items: [
                { text: 'Global 7000' },
                { text: 'Global 7500' },
            ],
        },
        {
            text: 'Dassault',
            iconCss: 'material-icons compare_arrows', // Add the icon class name here

            items: [
                { text: 'F46' },
            ],
        },
    ];

    const menuItems: MenuItemModel[] = [{
        items: allCustomerProgramMenus,
        text: customerProgram
    }];


    function btnClick() {
        // cMenu.open(40, 20);
        // menuRef.open(40, 20);
    }
    // return (<div className="container">
    //     <ContextMenuComponent id='contextmenu' ref={(scope) => cMenu = scope} items={menuItems} />
    //     <ButtonComponent onClick={btnClick}>Open ContextMenu</ButtonComponent>
    // </div>);

    return (
        <>
            <MenuComponent items={menuItems} select={menuSelect} ref={menuRef} />
        </>
    )
}

export default CustomerMenu;
