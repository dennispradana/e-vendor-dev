import React, { useEffect, useState } from 'react';

const Stepper = ({ steps, currentStep }) => {
  const [displayedSteps, setDisplayedSteps] = useState([]);

  useEffect(() => {
    const updateStep = (stepNumber) => {
      const newSteps = steps.map((step, index) => ({
        description: step,
        completed: index < stepNumber,
        highlighted: index === stepNumber,
        selected: index <= stepNumber,
      }));

      return newSteps;
    };

    const current = updateStep(currentStep - 1);
    setDisplayedSteps(current);
  }, [steps, currentStep]);

  const displaySteps = displayedSteps.map((step, index) => {
    const stepNumber = step.completed ? (
      <span className="text-sm font-bold text-white ">&#10003;</span>
    ) : (
      index + 1
    );

    const stepDescriptionClass = `absolute top-0 w-32 mt-10 text-xs font-medium text-center uppercase ${
      step.highlighted ? 'text-gray-900' : 'text-gray-400'
    }`;

    const stepCircleClass = `flex items-center justify-center w-8 h-8  transition duration-500 ease-in-out border-2 border-gray-300 rounded-full ${
      step.completed
        ? 'bg-violet-400 text-white font-bold border border-violet-400'
        : step.selected
        ? 'text-violet-500 font-bold border border-violet-400'
        : ''
    }`;

    const stepLineClass = `flex-auto transition duration-500 ease-in-out border-t-2 ${
      step.completed ? 'border-violet-400' : 'border-gray-300'
    }`;

    return (
      <div
        key={index}
        className={
          index !== displayedSteps.length - 1
            ? 'flex items-center w-full'
            : 'flex items-center'
        }
      >
        <div className="relative flex flex-col items-center text-gray-500">
          <div className={stepCircleClass}>{stepNumber}</div>
          <div className={stepDescriptionClass}>{step.description}</div>
        </div>
        <div className={stepLineClass}></div>
      </div>
    );
  });

  return (
    <div className="flex items-center justify-between p-4 mx-4 mb-10">
      {displaySteps}
    </div>
  );
};

export default Stepper;
