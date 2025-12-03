/**
 * Select Control Component
 * 
 * Reusable select/dropdown control with label.
 * Used for option selection throughout the PDF editor.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectControlProps {
  /** Control label */
  label: string;
  
  /** Current value */
  value: string;
  
  /** Available options */
  options: SelectOption[];
  
  /** Change handler */
  onChange: (value: string) => void;
  
  /** Optional description */
  description?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Placeholder text */
  placeholder?: string;
}

export function SelectControl({
  label,
  value,
  options,
  onChange,
  description,
  disabled = false,
  placeholder = 'اختر...',
}: SelectControlProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
      </Label>
      
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

