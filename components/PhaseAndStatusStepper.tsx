import * as React from 'react';
import {
  StepperComponent,
  StepsDirective,
  StepDirective,
} from '@syncfusion/ej2-react-navigations';

export const PhaseAndStatusStepper = () => {
  return (
    <div className="stepper-validation">
      <StepperComponent activeStep={3}>
        <StepsDirective>
          <StepDirective
            iconCss={'sf-icon-cart'}
            isValid={true}
            label={'Initialisation'}
          />
          <StepDirective iconCss={'sf-icon-transport'} label={'Evaluation'} />
          <StepDirective iconCss={'sf-icon-payment'} label={'Investigation'} />
          <StepDirective iconCss={'sf-icon-cart'} label={'Implementation'} />
        </StepsDirective>
      </StepperComponent>
    </div>
  );
};
