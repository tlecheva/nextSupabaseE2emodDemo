import React from "react"

import { MenuComponent, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-react-navigations';

interface MyMenuEventArgs extends MenuEventArgs {
    parentObj?: {
        text: string;
    };
}

function CustomerMenu() {
    const [customerProgram, setCustomerProgram] = React.useState("Airbus / SA");
    function menuSelect(args: MyMenuEventArgs & { item: MyMenuEventArgs }) {
        const customer = args.item?.parentObj?.text
        const program = args.item?.text
        if (customer && !customer.includes("/")) {
            setCustomerProgram(customer + " / " + program)
        }
    }

    const allCustomerProgramMenus = [
        {
            text: 'Airbus',
            items: [
                { text: 'SA' },
                { text: 'LR' },
                { text: 'LA' },
                { text: 'ATR' },
                { text: '...' },
            ],
        },
        {
            text: 'Airbus Canada',
            items: [
                { text: 'A220' },
            ],
        },
        {
            text: 'Bombardier',
            items: [
                { text: 'Global 7000' },
                { text: 'Global 7500' },
            ],
        },
        {
            text: 'Dassault',
            items: [
                { text: 'F46' },
            ],
        },
    ]

    let menuItems: MenuItemModel[] = [{
        items: allCustomerProgramMenus,
        text: customerProgram
    }];
    return (<MenuComponent items={menuItems} select={menuSelect} />);
}
export default CustomerMenu;
