/**
 * Custom Text Settings Component
 * 
 * Allows users to add custom text sections to PDF:
 * - Header text (before tables)
 * - Footer text (after tables)
 * - Separator text (between tables)
 * 
 * @version 2.0.0
 * @date 2025-11-07
 */

"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePDFEditor } from "@/contexts/PDFEditorContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, AlignLeft, AlignCenter, AlignRight, Type, Palette } from "lucide-react";

export function CustomTextSettings() {
  const { state, updateSettings } = usePDFEditor();
  const { customTexts } = state.currentSettings;

  return (
    <div className="space-y-6">
      {/* Header Text Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <CardTitle>نص المقدمة (Header)</CardTitle>
            </div>
            <Switch
              checked={customTexts.header.enabled}
              onCheckedChange={(enabled) =>
                updateSettings({
                  customTexts: {
                    ...customTexts,
                    header: { ...customTexts.header, enabled },
                  },
                })
              }
            />
          </div>
          <CardDescription>
            نص يظهر في بداية PDF قبل الجداول - مناسب للمقدمة أو التعريف
          </CardDescription>
        </CardHeader>
        
        {customTexts.header.enabled && (
          <CardContent className="space-y-4">
            {/* Text Input */}
            <div className="space-y-2">
              <Label>النص</Label>
              <Textarea
                value={customTexts.header.text}
                onChange={(e) =>
                  updateSettings({
                    customTexts: {
                      ...customTexts,
                      header: { ...customTexts.header, text: e.target.value },
                    },
                  })
                }
                placeholder="اكتب نص المقدمة هنا..."
                rows={4}
                className="resize-none"
              />
            </div>

            <Separator />

            {/* Formatting Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Font Size */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  حجم الخط
                </Label>
                <Input
                  type="number"
                  min={12}
                  max={60}
                  value={customTexts.header.fontSize}
                  onChange={(e) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, fontSize: Number(e.target.value) },
                      },
                    })
                  }
                />
              </div>

              {/* Color */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  اللون
                </Label>
                <Input
                  type="color"
                  value={customTexts.header.color}
                  onChange={(e) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, color: e.target.value },
                      },
                    })
                  }
                />
              </div>

              {/* Alignment */}
              <div className="space-y-2">
                <Label>المحاذاة</Label>
                <Select
                  value={customTexts.header.alignment}
                  onValueChange={(value: 'left' | 'center' | 'right') =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, alignment: value },
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="right">
                      <div className="flex items-center gap-2">
                        <AlignRight className="h-4 w-4" />
                        يمين
                      </div>
                    </SelectItem>
                    <SelectItem value="center">
                      <div className="flex items-center gap-2">
                        <AlignCenter className="h-4 w-4" />
                        وسط
                      </div>
                    </SelectItem>
                    <SelectItem value="left">
                      <div className="flex items-center gap-2">
                        <AlignLeft className="h-4 w-4" />
                        يسار
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Margin Bottom */}
              <div className="space-y-2">
                <Label>المسافة السفلية</Label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={customTexts.header.marginBottom}
                  onChange={(e) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, marginBottom: Number(e.target.value) },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Bold & Italic */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={customTexts.header.bold}
                  onCheckedChange={(bold) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, bold },
                      },
                    })
                  }
                />
                <Label>عريض (Bold)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={customTexts.header.italic}
                  onCheckedChange={(italic) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        header: { ...customTexts.header, italic },
                      },
                    })
                  }
                />
                <Label>مائل (Italic)</Label>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Footer Text Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <CardTitle>نص الخاتمة (Footer)</CardTitle>
            </div>
            <Switch
              checked={customTexts.footer.enabled}
              onCheckedChange={(enabled) =>
                updateSettings({
                  customTexts: {
                    ...customTexts,
                    footer: { ...customTexts.footer, enabled },
                  },
                })
              }
            />
          </div>
          <CardDescription>
            نص يظهر في نهاية PDF بعد الجداول - مناسب للخاتمة أو الملاحظات
          </CardDescription>
        </CardHeader>
        
        {customTexts.footer.enabled && (
          <CardContent className="space-y-4">
            {/* Text Input */}
            <div className="space-y-2">
              <Label>النص</Label>
              <Textarea
                value={customTexts.footer.text}
                onChange={(e) =>
                  updateSettings({
                    customTexts: {
                      ...customTexts,
                      footer: { ...customTexts.footer, text: e.target.value },
                    },
                  })
                }
                placeholder="اكتب نص الخاتمة هنا..."
                rows={4}
                className="resize-none"
              />
            </div>

            <Separator />

            {/* Formatting Options - Similar to Header */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  حجم الخط
                </Label>
                <Input
                  type="number"
                  min={12}
                  max={60}
                  value={customTexts.footer.fontSize}
                  onChange={(e) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        footer: { ...customTexts.footer, fontSize: Number(e.target.value) },
                      },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  اللون
                </Label>
                <Input
                  type="color"
                  value={customTexts.footer.color}
                  onChange={(e) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        footer: { ...customTexts.footer, color: e.target.value },
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Bold & Italic */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  checked={customTexts.footer.bold}
                  onCheckedChange={(bold) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        footer: { ...customTexts.footer, bold },
                      },
                    })
                  }
                />
                <Label>عريض (Bold)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={customTexts.footer.italic}
                  onCheckedChange={(italic) =>
                    updateSettings({
                      customTexts: {
                        ...customTexts,
                        footer: { ...customTexts.footer, italic },
                      },
                    })
                  }
                />
                <Label>مائل (Italic)</Label>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

