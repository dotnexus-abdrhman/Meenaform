"use client";

import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface WizardProgressBarProps {
  currentStep: number;
  steps: Step[];
}

export default function WizardProgressBar({
  currentStep,
  steps,
}: WizardProgressBarProps) {
  return (
    <div className="w-full py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Steps */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-5 right-0 left-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              const isUpcoming = currentStep < step.number;

              return (
                <div
                  key={step.number}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / steps.length}%` }}
                >
                  {/* Circle */}
                  <div
                    className={`
                      relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-primary border-primary"
                          : isCurrent
                          ? "bg-white border-primary shadow-lg shadow-primary/30"
                          : "bg-white border-gray-300"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-bold ${
                          isCurrent ? "text-primary" : "text-gray-400"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-3 text-center">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        isCurrent
                          ? "text-primary"
                          : isCompleted
                          ? "text-gray-700"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-xs mt-1 hidden sm:block ${
                        isCurrent
                          ? "text-gray-600"
                          : isCompleted
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

