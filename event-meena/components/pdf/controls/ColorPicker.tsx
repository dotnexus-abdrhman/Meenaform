/**
 * Color Picker Control Component
 * 
 * Reusable color picker with label and preview.
 * Used for color settings throughout the PDF editor.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  /** Control label */
  label: string;
  
  /** Current color value (hex) */
  value: string;
  
  /** Change handler */
  onChange: (color: string) => void;
  
  /** Optional description */
  description?: string;
  
  /** Disabled state */
  disabled?: boolean;
}

export function ColorPicker({
  label,
  value,
  onChange,
  description,
  disabled = false,
}: ColorPickerProps) {
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Validate hex color format
    if (/^#[0-9A-Fa-f]{0,6}$/.test(newValue)) {
      onChange(newValue);
    }
  };
  
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
      </Label>
      
      <div className="flex items-center gap-2">
        {/* Color preview and picker */}
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={handleColorChange}
            disabled={disabled}
            className="w-12 h-10 rounded border border-input cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        {/* Hex input */}
        <Input
          type="text"
          value={value}
          onChange={handleTextChange}
          disabled={disabled}
          placeholder="#000000"
          className="flex-1 font-mono text-sm"
          maxLength={7}
        />
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

