/**
 * Canvas Editor Hook
 * 
 * Custom hook for managing canvas editor state and actions.
 * 
 * @version 5.0.0
 * @date 2025-11-12
 */

"use client";

import { useState, useCallback, useRef } from 'react';
import * as fabric from 'fabric';
import { createArabicText, createTable } from '@/components/pdf/canvas-editor/utils/fabricHelpers';
import { CanvasElement, CanvasHistory } from '@/types/canvas-editor';

export function useCanvasEditor() {
  const [canvas, setCanvas] = useState<any | null>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);

  // History management
  const [history, setHistory] = useState<CanvasHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);

  /**
   * Initialize canvas
   */
  const initCanvas = useCallback((fabricCanvas: any) => {
    setCanvas(fabricCanvas);
    
    // Setup event listeners
    fabricCanvas.on('selection:created', (e: any) => {
      if (e.selected && e.selected[0]) {
        const obj = e.selected[0];
        const element = elements.find(el => el.fabricObject === obj);
        if (element) {
          setSelectedElement(element);
        }
      }
    });
    
    fabricCanvas.on('selection:updated', (e: any) => {
      if (e.selected && e.selected[0]) {
        const obj = e.selected[0];
        const element = elements.find(el => el.fabricObject === obj);
        if (element) {
          setSelectedElement(element);
        }
      }
    });
    
    fabricCanvas.on('selection:cleared', () => {
      setSelectedElement(null);
    });
    
    // Save history on object modification
    fabricCanvas.on('object:modified', () => {
      if (!isUndoRedoRef.current) {
        saveHistory(fabricCanvas);
      }
    });
    
    fabricCanvas.on('object:added', () => {
      if (!isUndoRedoRef.current) {
        saveHistory(fabricCanvas);
        syncElementsFromCanvas(fabricCanvas);
      }
    });

    fabricCanvas.on('object:removed', () => {
      if (!isUndoRedoRef.current) {
        saveHistory(fabricCanvas);
        syncElementsFromCanvas(fabricCanvas);
      }
    });
    
    // Save initial state
    saveHistory(fabricCanvas);
  }, [elements]);
  
  /**
   * Sync elements list from canvas objects
   */
  const syncElementsFromCanvas = useCallback((fabricCanvas: any) => {
    const objects = fabricCanvas.getObjects();
    const newElements: CanvasElement[] = [];

    objects.forEach((obj: any) => {
      // Skip grid lines and guidelines
      if (obj.id === 'grid' || obj.strokeDashArray) return;

      // Check if element already exists
      const existingElement = elements.find(el => el.fabricObject === obj);
      if (existingElement) {
        newElements.push(existingElement);
      } else {
        // Create new element
        const type = obj.type === 'i-text' || obj.type === 'text' ? 'text' :
                     obj.type === 'group' ? 'table' : 'shape';
        const name = type === 'text' ? (obj.text?.substring(0, 20) || 'نص') :
                     type === 'table' ? 'جدول' : 'شكل';

        newElements.push({
          id: obj.id || `${type}-${Date.now()}-${Math.random()}`,
          type,
          name,
          visible: obj.visible !== false,
          locked: !obj.selectable,
          fabricObject: obj,
        });
      }
    });

    setElements(newElements);
  }, [elements]);

  /**
   * Save canvas state to history
   */
  const saveHistory = useCallback((fabricCanvas: any) => {
    const state = JSON.stringify(fabricCanvas.toJSON());
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({
      state,
      timestamp: Date.now(),
    });

    // Limit history to 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(historyIndex + 1);
    }

    setHistory(newHistory);
  }, [history, historyIndex]);
  
  /**
   * Undo last action
   */
  const undo = useCallback(() => {
    if (!canvas || historyIndex <= 0) return;

    isUndoRedoRef.current = true;
    const prevState = history[historyIndex - 1];

    canvas.loadFromJSON(prevState.state, () => {
      canvas.renderAll();
      setHistoryIndex(historyIndex - 1);
      syncElementsFromCanvas(canvas);
      isUndoRedoRef.current = false;
    });
  }, [canvas, history, historyIndex, syncElementsFromCanvas]);

  /**
   * Redo last undone action
   */
  const redo = useCallback(() => {
    if (!canvas || historyIndex >= history.length - 1) return;

    isUndoRedoRef.current = true;
    const nextState = history[historyIndex + 1];

    canvas.loadFromJSON(nextState.state, () => {
      canvas.renderAll();
      setHistoryIndex(historyIndex + 1);
      syncElementsFromCanvas(canvas);
      isUndoRedoRef.current = false;
    });
  }, [canvas, history, historyIndex, syncElementsFromCanvas]);
  
  /**
   * Add text element
   */
  const addText = useCallback((text: string) => {
    if (!canvas) return;
    
    const textObj = createArabicText(text, {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#000000',
      fontFamily: 'Cairo',
    });
    
    // Set ID for the object
    (textObj as any).id = `text-${Date.now()}`;

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    // Elements will be synced automatically via object:added event
  }, [canvas]);
  
  /**
   * Add table element
   */
  const addTable = useCallback(() => {
    if (!canvas) return;

    // Sample table data
    const sampleHeaders = ['العمود 1', 'العمود 2', 'العمود 3'];
    const sampleRows = [
      { 'العمود 1': 'بيانات 1', 'العمود 2': 'بيانات 2', 'العمود 3': 'بيانات 3' },
      { 'العمود 1': 'بيانات 4', 'العمود 2': 'بيانات 5', 'العمود 3': 'بيانات 6' },
    ];

    const tableObj = createTable(canvas, {
      headers: sampleHeaders,
      rows: sampleRows,
      x: 100,
      y: 100,
      width: 400,
      cellHeight: 40,
      headerBg: '#3b82f6',
      headerText: '#ffffff',
      rowBg: '#ffffff',
      rowText: '#000000',
      borderColor: '#e5e7eb',
      fontFamily: 'Cairo',
      fontSize: 14,
    });

    canvas.setActiveObject(tableObj);
    canvas.renderAll();

    // Elements will be synced automatically via object:added event
  }, [canvas]);
  
  /**
   * Select element
   */
  const selectElement = useCallback((element: CanvasElement) => {
    if (!canvas) return;
    
    canvas.setActiveObject(element.fabricObject);
    canvas.renderAll();
    setSelectedElement(element);
  }, [canvas]);
  
  /**
   * Deselect element
   */
  const deselectElement = useCallback(() => {
    if (!canvas) return;
    
    canvas.discardActiveObject();
    canvas.renderAll();
    setSelectedElement(null);
  }, [canvas]);
  
  /**
   * Toggle grid
   */
  const toggleGrid = useCallback(() => {
    setGridEnabled(!gridEnabled);
  }, [gridEnabled]);
  
  /**
   * Toggle snap
   */
  const toggleSnap = useCallback(() => {
    setSnapEnabled(!snapEnabled);
  }, [snapEnabled]);
  
  return {
    canvas,
    initCanvas,
    elements,
    selectedElement,
    selectElement,
    deselectElement,
    addText,
    addTable,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    gridEnabled,
    snapEnabled,
    toggleGrid,
    toggleSnap,
  };
}

