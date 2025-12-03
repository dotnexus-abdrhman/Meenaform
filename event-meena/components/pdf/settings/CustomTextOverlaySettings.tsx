/**
 * Custom Text Overlay Settings Component
 * 
 * Allows users to add, edit, and manage custom text overlays on the PDF.
 * 
 * @version 1.0.0
 * @date 2025-11-11
 */

"use client";

import React, { useState } from 'react';
import { usePDFEditor } from '@/contexts/PDFEditorContext';
import { CustomTextOverlay } from '@/types/pdf-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react';

export function CustomTextOverlaySettings() {
  const { state, addCustomTextOverlay, updateCustomTextOverlay, deleteCustomTextOverlay } = usePDFEditor();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingOverlay, setEditingOverlay] = useState<CustomTextOverlay | null>(null);
  
  // Form state for new/edit overlay
  const [formData, setFormData] = useState<Omit<CustomTextOverlay, 'id'>>({
    content: '',
    position: { x: 20, y: 20 },
    fontSize: 16,
    color: '#000000',
    fontWeight: 400,
    textAlign: 'right',
    visible: true,
  });

  const overlays = state.currentSettings.customTextOverlays || [];

  const handleAddOverlay = () => {
    addCustomTextOverlay(formData);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleUpdateOverlay = () => {
    if (editingOverlay) {
      updateCustomTextOverlay(editingOverlay.id, formData);
      setEditingOverlay(null);
      resetForm();
    }
  };

  const handleEditClick = (overlay: CustomTextOverlay) => {
    setEditingOverlay(overlay);
    setFormData({
      content: overlay.content,
      position: overlay.position,
      fontSize: overlay.fontSize,
      color: overlay.color,
      fontWeight: overlay.fontWeight,
      textAlign: overlay.textAlign,
      rotation: overlay.rotation,
      opacity: overlay.opacity,
      backgroundColor: overlay.backgroundColor,
      fontFamily: overlay.fontFamily,
      visible: overlay.visible,
      zIndex: overlay.zIndex,
    });
  };

  const handleToggleVisibility = (overlay: CustomTextOverlay) => {
    updateCustomTextOverlay(overlay.id, { visible: !overlay.visible });
  };

  const resetForm = () => {
    setFormData({
      content: '',
      position: { x: 20, y: 20 },
      fontSize: 16,
      color: '#000000',
      fontWeight: 400,
      textAlign: 'right',
      visible: true,
    });
  };

  const OverlayForm = () => (
    <div className="space-y-4">
      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">محتوى النص</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="أدخل النص المخصص..."
          rows={3}
          className="resize-none"
        />
      </div>

      {/* Position */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="posX">الموضع X (mm)</Label>
          <Input
            id="posX"
            type="number"
            value={formData.position.x}
            onChange={(e) => setFormData({
              ...formData,
              position: { ...formData.position, x: Number(e.target.value) }
            })}
            min={0}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="posY">الموضع Y (mm)</Label>
          <Input
            id="posY"
            type="number"
            value={formData.position.y}
            onChange={(e) => setFormData({
              ...formData,
              position: { ...formData.position, y: Number(e.target.value) }
            })}
            min={0}
          />
        </div>
      </div>

      {/* Font Size and Color */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fontSize">حجم الخط (px)</Label>
          <Input
            id="fontSize"
            type="number"
            value={formData.fontSize}
            onChange={(e) => setFormData({ ...formData, fontSize: Number(e.target.value) })}
            min={8}
            max={72}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color">اللون</Label>
          <div className="flex gap-2">
            <Input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-16 h-10 p-1"
            />
            <Input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {/* Font Weight and Text Align */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fontWeight">وزن الخط</Label>
          <Select
            value={formData.fontWeight.toString()}
            onValueChange={(value) => setFormData({ ...formData, fontWeight: Number(value) as 400 | 600 | 700 | 800 | 900 })}
          >
            <SelectTrigger id="fontWeight">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="400">عادي (400)</SelectItem>
              <SelectItem value="600">متوسط (600)</SelectItem>
              <SelectItem value="700">عريض (700)</SelectItem>
              <SelectItem value="800">عريض جداً (800)</SelectItem>
              <SelectItem value="900">أعرض (900)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="textAlign">المحاذاة</Label>
          <Select
            value={formData.textAlign}
            onValueChange={(value) => setFormData({ ...formData, textAlign: value as 'right' | 'center' | 'left' })}
          >
            <SelectTrigger id="textAlign">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="right">يمين</SelectItem>
              <SelectItem value="center">وسط</SelectItem>
              <SelectItem value="left">يسار</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Optional: Rotation */}
      <div className="space-y-2">
        <Label htmlFor="rotation">الدوران (درجات) - اختياري</Label>
        <Input
          id="rotation"
          type="number"
          value={formData.rotation || 0}
          onChange={(e) => setFormData({ ...formData, rotation: Number(e.target.value) })}
          min={-180}
          max={180}
        />
      </div>

      {/* Optional: Opacity */}
      <div className="space-y-2">
        <Label htmlFor="opacity">الشفافية (0-1) - اختياري</Label>
        <Input
          id="opacity"
          type="number"
          step="0.1"
          value={formData.opacity || 1}
          onChange={(e) => setFormData({ ...formData, opacity: Number(e.target.value) })}
          min={0}
          max={1}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium">النصوص المخصصة</h4>
          <p className="text-xs text-muted-foreground mt-1">
            أضف نصوص في أي مكان على PDF
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              إضافة نص
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة نص مخصص</DialogTitle>
              <DialogDescription>
                أضف نص مخصص في أي مكان على PDF
              </DialogDescription>
            </DialogHeader>
            <OverlayForm />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={handleAddOverlay} disabled={!formData.content.trim()}>
                إضافة
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overlays List */}
      {overlays.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm border rounded-lg border-dashed">
          لا توجد نصوص مخصصة. اضغط "إضافة نص" للبدء.
        </div>
      ) : (
        <div className="space-y-2">
          {overlays.map((overlay) => (
            <div
              key={overlay.id}
              className={`
                flex items-center justify-between p-3 rounded-lg border
                ${overlay.visible ? 'border-border bg-background' : 'border-border bg-muted/50 opacity-60'}
                transition-all
              `}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">
                    {overlay.content.substring(0, 50)}
                    {overlay.content.length > 50 && '...'}
                  </p>
                  {!overlay.visible && (
                    <Badge variant="secondary" className="text-xs">
                      مخفي
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  الموضع: ({overlay.position.x}, {overlay.position.y}) • 
                  الحجم: {overlay.fontSize}px • 
                  المحاذاة: {overlay.textAlign === 'right' ? 'يمين' : overlay.textAlign === 'center' ? 'وسط' : 'يسار'}
                </p>
              </div>
              
              <div className="flex items-center gap-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleToggleVisibility(overlay)}
                >
                  {overlay.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                
                <Dialog open={editingOverlay?.id === overlay.id} onOpenChange={(open) => !open && setEditingOverlay(null)}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" onClick={() => handleEditClick(overlay)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>تعديل النص المخصص</DialogTitle>
                      <DialogDescription>
                        عدّل خصائص النص المخصص
                      </DialogDescription>
                    </DialogHeader>
                    <OverlayForm />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditingOverlay(null)}>
                        إلغاء
                      </Button>
                      <Button onClick={handleUpdateOverlay} disabled={!formData.content.trim()}>
                        حفظ التغييرات
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>حذف النص المخصص</AlertDialogTitle>
                      <AlertDialogDescription>
                        هل أنت متأكد من حذف هذا النص؟ لا يمكن التراجع عن هذا الإجراء.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteCustomTextOverlay(overlay.id)}>
                        حذف
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

