import * as React from 'react';
import {
  FocusOutEventArgs,
  TextArea,
  TextAreaComponent,
} from '@syncfusion/ej2-react-inputs';
import { EmitType } from '@syncfusion/ej2-base';

import { useRouter } from 'next/router';
import { updateChange } from '@/lib/updateChange';
import {
  DropDownListComponent,
  MultiSelectComponent,
} from '@syncfusion/ej2-react-dropdowns';

// To avoid TS warning on 'rows'..
interface ExtendedTextAreaComponentProps {
  id?: string;
  rows?: number;
  key: string;
  blur?: EmitType<FocusOutEventArgs>;
  placeholder: string;
  enabled: boolean;
  floatLabelType: string;
  value: string;
  width: string;
  cssClass: string;
  resizeMode: string;
}

// Create a functional component that wraps the original TextAreaComponent
const ExtendedTextAreaComponent: React.FC<
  ExtendedTextAreaComponentProps
> = props => {
  let textareaObj: TextArea | null = null;

  const adjustHeightToText = () => {
    if (textareaObj && textareaObj.element) {
      textareaObj.element.style.height = 'auto';
      textareaObj.element.style.height =
        textareaObj.element.scrollHeight + 'px';
    }
  };
  return (
    <TextAreaComponent
      {...props}
      created={adjustHeightToText}
      ref={scope => {
        textareaObj = scope;
      }}
    />
  );
};

export const EditableAtributeChange = ({
  label,
  attribute,
  inputType,
  width,
  blue = false,
  enabled = true,
}: {
  label: string;
  attribute: string;
  inputType: string;
  width: string;
  blue?: boolean;
  enabled?: boolean;
}) => {
  const router = useRouter();
  const query = router.query;
  const { change_id } = query;
  const val = query[attribute];
  const value: string = !val || val === 'null' ? '' : String(val);
  const id = 'TextAreaComponent_' + label + '_' + attribute;

  // Testing different Components based in the future on inputType
  if (label === 'STep/IStep') {
    const source: string[] = [
      'Step 4.1',
      'Step 4.15',
      'Step 4.2',
      'Step 5',
      'iStep 23B',
    ];
    let value: string = source[1];
    return (
      <DropDownListComponent
        id="selement"
        dataSource={source}
        value={value}
        width={width}
        placeholder={label}
        enabled={enabled}
        floatLabelType="Always"
      />
    );
  } else if (label === 'STD AC') {
    const source: string[] = [
      'CJ',
      'ST1',
      'ST2',
      'ST3',
      'ST4',
      'ST5',
      'ST6',
      'ST8',
      'ST9',
      'ST10',
    ];
    const value = ['CJ', 'ST1', 'ST9'];
    return (
      <MultiSelectComponent
        id="mtselement"
        dataSource={source}
        value={value}
        width={width}
        placeholder={label}
        enabled={enabled}
        floatLabelType="Always"
      />
    );
  } else
    return (
      <ExtendedTextAreaComponent
        id={id}
        key={id}
        placeholder={label}
        enabled={enabled}
        floatLabelType="Always"
        value={value}
        width={width}
        cssClass={blue ? 'textAeraComponent-blue' : ''}
        resizeMode="Vertical"
        rows={1}
        blur={e => {
          updateChange(String(change_id), attribute, e.value);
        }}
      />
    );
};
