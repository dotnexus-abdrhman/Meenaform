'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import { Button } from '@/components/ui/button';
import { Paintbrush, X } from 'lucide-react';

interface ColorPickerPopoverProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Color Picker Popover Component
 * Uses react-color ChromePicker for professional color selection
 */
export function ColorPickerPopover({
  color,
  onChange,
  label = 'اختر اللون',
  disabled = false,
}: ColorPickerPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (colorResult: ColorResult) => {
    // Convert to hex format
    const hexColor = colorResult.hex;
    onChange(hexColor);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={popoverRef}>
      <Button
        variant="outline"
        size="sm"
        disabled={disabled}
        className="gap-2 h-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Paintbrush className="w-4 h-4" />
        <div
          className="w-6 h-6 rounded border-2 border-gray-300"
          style={{ backgroundColor: color }}
        />
        <span className="hidden sm:inline">{label}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-lg shadow-xl border p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">اختر اللون</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            disableAlpha={false}
          />
        </div>
      )}
    </div>
  );
}

