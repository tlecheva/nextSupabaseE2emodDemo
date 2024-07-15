import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';
import { useEditChangeHeader } from '@/lib/changeDbCalls';

export const AttributesForCategory = ({ category = 'General attributes' }) => {
  const headers = useEditChangeHeader(category);

  //         {EditableAtributeChange('CA (CWP)', 'ca', '90%')}
  //         {EditableAtributeChange('Supplier Change Request #', 'supplier_cr', '90 % ')}
  return (
    <section>
      <div className="flex flex-wrap flex-column ml-5 gap-3 pb-10">
        <EditableAtributeChange
          key="test"
          label="STep/IStep"
          inputType=""
          attribute=""
          width="100%"
        />
        {headers.map(header => (
          <EditableAtributeChange
            key={header.attribute} // Ensure each child has a unique key
            label={header.label ?? ''}
            inputType={header.input_type ?? ''}
            attribute={header.attribute ?? ''}
            width="100%"
          />
        ))}
      </div>
    </section>
  );
};
