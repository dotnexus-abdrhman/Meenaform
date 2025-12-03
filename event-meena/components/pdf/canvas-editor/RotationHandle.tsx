/**
 * Rotation Handle Component
 * 
 * Visual rotation handle for dragging to rotate elements
 * Similar to Figma, Canva, and Photoshop rotation handles
 * 
 * @version 1.0.0
 * @date 2025-11-13
 */

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

interface RotationHandleProps {
  rotation: number;
  onRotate: (rotation: number) => void;
  elementRef: React.RefObject<HTMLDivElement | null>;
  snapToAngles?: boolean; // Snap to 45° increments when Shift is held
}

export function RotationHandle({
  rotation,
  onRotate,
  elementRef,
  snapToAngles = true,
}: RotationHandleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentAngle, setCurrentAngle] = useState(rotation);
  const [shiftPressed, setShiftPressed] = useState(false);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentAngle(rotation);
  }, [rotation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDragging(true);

    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - centerX;
      const deltaY = moveEvent.clientY - centerY;
      
      // Calculate angle in degrees
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
      
      // Normalize to 0-360
      if (angle < 0) angle += 360;
      
      // Snap to 45° increments if Shift is pressed
      if (shiftPressed && snapToAngles) {
        angle = Math.round(angle / 45) * 45;
      }
      
      setCurrentAngle(angle);
      onRotate(angle);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      {/* Rotation Handle */}
      <div
        ref={handleRef}
        className="absolute -top-10 left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing z-50"
        onMouseDown={handleMouseDown}
        style={{
          pointerEvents: 'auto',
        }}
      >
        {/* Connection Line */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-blue-400" />
        
        {/* Handle Circle */}
        <div className="relative w-8 h-8 bg-white border-2 border-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors">
          <RotateCw className="w-4 h-4 text-blue-500" />
        </div>
      </div>

      {/* Angle Indicator (shown while dragging) */}
      {isDragging && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap z-50">
          {Math.round(currentAngle)}°
          {shiftPressed && snapToAngles && (
            <span className="ml-2 text-xs text-blue-300">(Snap)</span>
          )}
        </div>
      )}
    </>
  );
}

