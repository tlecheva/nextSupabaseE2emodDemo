
import * as React from 'react';
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { useRouter } from 'next/router';
import { updateChange } from '@/lib/updateChange';

// To avoid TS warning on 'rows'..
interface ExtendedTextAreaComponentProps {
    id?: string;
    rows?: number; // Your additional prop here
    blur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    enabled: boolean;
    floatLabelType: string;
    value: string;
    width: string;
    cssClass: string;
    resizeMode: string;
}

// Create a functional component that wraps the original TextAreaComponent
// const ExtendedTextAreaComponent: React.FC<ExtendedTextAreaComponentProps> = (props) => {
// To avoid consoloe warning on 'value'..    
// const [val, setVal] = React.useState(props.value);
//     const handleChange = (event) => {
//         setVal(event.target.value);
//     };
//     return (
//         <TextAreaComponent {...props} value={val} change={handleChange} />
//     );
// };
const ExtendedTextAreaComponent: React.FC<ExtendedTextAreaComponentProps> = (props) => {
    return (
        <TextAreaComponent {...props} />
    );
};


export const EditableAtributeChange = (label: string, attribute: string, width: string, { blue = false, enabled = true }
    : { blue?: boolean, enabled?: boolean } = {}) => {
    const router = useRouter();
    const query = router.query
    const { change_id } = query
    const val = query[attribute]
    const value: string = !val || val === 'null' ? '' : String(val)
    return (
        <>
            <ExtendedTextAreaComponent
                id={'TextAreaComponent' + attribute}
                key={'TextAreaComponent' + attribute}
                placeholder={label}
                enabled={enabled}
                floatLabelType="Always"
                value={value}
                width={width}
                cssClass={blue ? 'textAeraComponent-blue' : ''}
                resizeMode="Vertical"
                rows={1}
                blur={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateChange(String(change_id), attribute, e.target.value)}
            />
        </>)
}


