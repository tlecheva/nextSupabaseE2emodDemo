import React from "react"
import { MenuComponent, MenuItemModel, MenuEventArgs } from '@syncfusion/ej2-react-navigations';


interface MyMenuEventArgs extends MenuEventArgs {
    parentObj?: {
        text: string;
        // Add other properties here as needed
    };
}

function CustomerMenu() {
    const [customerProgram, setCustomerProgram] = React.useState("Airbus / SA");
    function menuSelect(args: MyMenuEventArgs & { item: MyMenuEventArgs }) {
        setCustomerProgram(args.item?.parentObj?.text + " / " + args.item?.text)
    }

    let menuItems: MenuItemModel[] = [{
        items: [
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
        ],
        text: customerProgram
    },
    ];
    return (<MenuComponent items={menuItems} select={menuSelect} />);
}
export default CustomerMenu;
