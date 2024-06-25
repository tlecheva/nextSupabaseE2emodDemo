
import * as React from 'react';
import { PhaseAndStatusStepper } from './PhaseAndStatusStepper';
import { EditChangeTabs } from './EditChangeTabs';
import { EditableAtributeChange } from './EditableAtributeChange';

export const GeneralAttributes = () =>
(
    <section >
        <div className="flex flex-wrap flex-column ml-5 gap-3" >
            {EditableAtributeChange('POE Conf', 'poe_conf', '90%')}
            {EditableAtributeChange('CA (CWP)', 'ca', '90%')}
            {EditableAtributeChange('PA#', 'pas', '90%')}
            {EditableAtributeChange('General Description', 'description', '90%')}
            {EditableAtributeChange('Supplier Change Request #', 'supplier_cr', '90 % ')}
        </div>
    </section >
)
