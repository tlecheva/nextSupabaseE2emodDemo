import * as React from "react";
import * as ReactDom from "react-dom";
import { StepperComponent, StepsDirective, StepDirective } from '@syncfusion/ej2-react-navigations';
import {
    Check as CheckIcon,
    BlurCircular as BlurCircularIcon,
} from "@airbus/icons/react";

export const PhaseAndStatusStepper = () => {
    // const getTemplate = ({ step }) => {
    //     console.log("🚀 ~ getTemplate ~ step:", step)
    //     const {
    //         label, isValid, status
    //     } = step;
    //     console.log("🚀 ~ getTemplate ~ label, isValid, status:", label, isValid, status)
    //     const tailwindcss = "rounded-full  text-white text-4xl"

    //     const finalClass = status === 'Completed' ? tailwindcss.replace('grey', 'green') : status === 'InProgress' ? tailwindcss.replace('grey', 'blue') : tailwindcss;
    //     return (
    //         <div className="stepper-template-content">
    //             {label === 'Initialisation' ?
    //                 <CheckIcon
    //                     // className="rounded-full bg-green-600 p-2 hover:bg-green-700 text-white text-4xl" />
    //                     className={finalClass} /> :
    //                 label === 'Evaluation' ? <BlurCircularIcon className={finalClass} /> :
    //                     label === 'Investigation' ? <BlurCircularIcon className={finalClass} /> :
    //                         <BlurCircularIcon className={finalClass} />
    //             }
    //             <span className="e-label">{step.label}</span>
    //         </div>)
    // }

    return (
        <div className="stepper-validation">
            <StepperComponent activeStep={3}>
                <StepsDirective>
                    <StepDirective iconCss={'sf-icon-cart'} isValid={true} label={'Initialisation'} />
                    <StepDirective iconCss={'sf-icon-transport'} label={'Evaluation'} />
                    <StepDirective iconCss={'sf-icon-payment'} label={'Investigation'} />
                    <StepDirective iconCss={'sf-icon-cart'} label={'Implementation'} />
                </StepsDirective>
            </StepperComponent>
        </div>
    )
}
