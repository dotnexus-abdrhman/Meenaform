# Enhanced HTML-Based PDF Editor

## Overview

A high-performance, interactive PDF editor built with HTML/CSS instead of Canvas for superior performance and user experience.

## Features

### ✅ Core Functionality
- **Draggable Tables**: All tables can be dragged and repositioned using `react-draggable`
- **Resizable Elements**: Tables, text, and images can be resized with visual handles
- **Inline Editing**: Double-click table cells to edit content directly
- **Smooth Interactions**: Optimized drag & drop with visual feedback
- **Snap to Grid**: Precise alignment with optional grid snapping
- **Visual Guidelines**: Helpful guides when dragging elements

### ✅ Professional UI
- **Zoom Controls**: Zoom in/out, fit to screen, reset (10% - 200%)
- **Toolbar**: Professional toolbar with all essential tools
- **Layers Panel**: View and manage all elements with visibility toggle
- **Selection Indicators**: Clear visual feedback with colored borders
- **Keyboard Shortcuts**: 
  - `Delete`: Remove selected element
  - `Ctrl+Z`: Undo
  - `Ctrl+Y` or `Ctrl+Shift+Z`: Redo
  - Arrow keys: Nudge selected element (coming soon)

### ✅ Export System
- **Dual Export**: 
  - Preview Mode: Exports static preview (fast)
  - Editor Mode: Exports edited canvas with all modifications (high quality)
- **High Quality**: 300 DPI equivalent output
- **Arabic Support**: Full RTL text rendering

### ✅ Performance
- **React.memo**: Optimized component rendering
- **Debouncing**: Smart history management
- **Lazy Loading**: Elements rendered on demand
- **Smooth Animations**: CSS transitions for fluid UX

### ✅ Error Handling
- **Error Boundary**: Graceful error recovery
- **Data Validation**: Input validation before rendering
- **Console Logging**: Detailed error messages for debugging
- **Fallback UI**: User-friendly error messages

## Architecture

```
EnhancedHTMLEditor.tsx          # Main editor component
├── DraggableTable              # Memoized table component
├── Toolbar                     # Zoom, grid, snap, undo/redo controls
├── Canvas Area                 # Main editing area with grid
├── Layers Panel                # Element management sidebar
└── Export Handler              # PDF generation with html2canvas + jsPDF

EditorErrorBoundary.tsx         # Error handling wrapper
enhanced-html-editor.css        # Custom styles for resizable handles
```

## Usage

```tsx
import { EnhancedHTMLEditor } from './canvas-editor/EnhancedHTMLEditor';

<EnhancedHTMLEditor
  settings={pdfSettings}
  sampleData={{
    eventTitle: 'Event Name',
    tables: [
      {
        title: 'Table Title',
        headers: ['Column 1', 'Column 2'],
        rows: [
          { 'Column 1': 'Data 1', 'Column 2': 'Data 2' }
        ]
      }
    ]
  }}
  zoom={0.5}
  onExport={(pdfBlob) => {
    // Handle exported PDF
  }}
/>
```

## Element Types

### TableElement
```typescript
{
  id: string;
  type: 'table';
  title: string;
  headers: string[];
  rows: Array<Record<string, string>>;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  locked: boolean;
  zIndex: number;
}
```

### TextElement
```typescript
{
  id: string;
  type: 'text';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  fontSize: number;
  color: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}
```

### ImageElement
```typescript
{
  id: string;
  type: 'image';
  src: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  locked: boolean;
  zIndex: number;
}
```

## Performance Comparison

| Feature | Canvas Editor | HTML Editor |
|---------|--------------|-------------|
| **File Size** | ~5-10 MB per table | ~50 KB per table |
| **Drag Performance** | Slow (heavy images) | Fast (native HTML) |
| **Edit Capability** | Limited | Full inline editing |
| **Rendering Speed** | Slow | Fast |
| **Memory Usage** | High | Low |
| **Quality** | May pixelate | Always crisp |

## Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ⚠️ IE11 (Not supported)

## Dependencies

- `react-draggable`: ^4.5.0
- `react-resizable`: ^3.0.5
- `html2canvas`: ^1.4.1
- `jspdf`: ^3.0.3

## Future Enhancements

- [ ] Add text/image elements from toolbar
- [ ] Multi-select with Shift+Click
- [ ] Alignment tools (align left, center, right, distribute)
- [ ] Copy/paste elements
- [ ] Keyboard nudging with arrow keys
- [ ] Rotation support
- [ ] Grouping/ungrouping elements
- [ ] Templates library
- [ ] Collaborative editing

## Troubleshooting

### Tables not dragging smoothly
- Ensure `react-draggable` is installed
- Check if grid snap is enabled (may cause stuttering)
- Verify browser performance

### Export quality is low
- Check `scale` parameter in html2canvas (should be 3)
- Ensure zoom is set to 1.0 during export
- Verify PDF settings (should be 300 DPI equivalent)

### Arabic text not displaying correctly
- Ensure `dir="rtl"` is set on table elements
- Check `unicodeBidi: 'bidi-override'` in styles
- Verify font supports Arabic characters

## License

MIT

## Author

Developed for event-meena project
Version 6.0.0 - Enhanced HTML Editor
Date: 2025-11-13

