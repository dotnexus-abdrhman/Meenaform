/**
 * Slider Control Component
 * 
 * Reusable slider control with label and value display.
 * Used for numeric settings like font sizes, spacing, etc.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface SliderControlProps {
  /** Control label */
  label: string;
  
  /** Current value */
  value: number;
  
  /** Minimum value */
  min: number;
  
  /** Maximum value */
  max: number;
  
  /** Step increment */
  step?: number;
  
  /** Unit to display (e.g., 'px', 'mm', '%') */
  unit?: string;
  
  /** Change handler */
  onChange: (value: number) => void;
  
  /** Optional description */
  description?: string;
  
  /** Disabled state */
  disabled?: boolean;
}

export function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  description,
  disabled = false,
}: SliderControlProps) {
  const handleChange = (values: number[]) => {
    onChange(values[0]);
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          {label}
        </Label>
        <span className="text-sm font-semibold text-primary">
          {value}{unit}
        </span>
      </div>
      
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={handleChange}
        disabled={disabled}
        className="w-full"
      />
      
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

