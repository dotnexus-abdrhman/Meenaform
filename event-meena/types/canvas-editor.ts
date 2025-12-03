/**
 * Canvas Editor Types
 * 
 * Type definitions for the canvas editor.
 * 
 * @version 5.0.0
 * @date 2025-11-12
 */

import * as fabric from 'fabric';

export interface CanvasElement {
  id: string;
  type: 'text' | 'table' | 'image' | 'shape';
  name: string;
  visible: boolean;
  locked: boolean;
  fabricObject: fabric.Object;
}

export interface CanvasHistory {
  state: string; // JSON state of canvas
  timestamp: number;
}

