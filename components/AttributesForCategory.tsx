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
        {headers.map(header => (
          <EditableAtributeChange
            key={header.attribute} // Ensure each child has a unique key
            label={header.label ?? ''}
            attribute={header.attribute ?? ''}
            width="100%"
          />
        ))}
      </div>
    </section>
  );
};
