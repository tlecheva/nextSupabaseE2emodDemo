import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const Stepper = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  return (
    <div className="w-full">
      <h1 className="mb-12">Tailwind Stepper (in progress..;-)</h1>

      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
              } `}
            onClick={() => {
              setCurrentStep(i - 1);
            }}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
      {complete && (
        <button
          className="btn"
          onClick={() => {
            setComplete(false)
            setCurrentStep(0)
          }}
        >
          {"Reset"}
        </button>
      )}
      <br />
      {currentStep > 0 && (
        <button
          className="btn"
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
          }}
        >
          {"Previous"}
        </button>
      )}

    </div>
  );
};

export default Stepper;


