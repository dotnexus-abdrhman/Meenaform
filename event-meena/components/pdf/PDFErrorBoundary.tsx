/**
 * PDF Error Boundary
 * 
 * Error boundary component for PDF editor to catch and handle errors gracefully.
 * Prevents the entire app from crashing if there's an error in the PDF editor.
 * 
 * @version 1.0.0
 * @date 2025-11-05
 */

"use client";

import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class PDFErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('PDF Editor Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-xl">حدث خطأ في محرر PDF</CardTitle>
                <CardDescription className="mt-1">
                  عذراً، حدث خطأ غير متوقع. يمكنك المحاولة مرة أخرى.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Error Details */}
            {this.state.error && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">تفاصيل الخطأ:</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
            
            {/* Error Stack (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="p-4 bg-muted rounded-lg">
                <summary className="text-sm font-medium cursor-pointer mb-2">
                  Stack Trace (للمطورين)
                </summary>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-64 mt-2">
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={this.handleReset}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                إعادة المحاولة
              </Button>
              
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="flex-1"
              >
                <Home className="w-4 h-4 mr-2" />
                إعادة تحميل الصفحة
              </Button>
            </div>
            
            {/* Help Text */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                💡 <strong>نصيحة:</strong> إذا استمرت المشكلة، حاول:
              </p>
              <ul className="text-xs text-blue-800 dark:text-blue-200 list-disc list-inside mt-2 space-y-1">
                <li>مسح ذاكرة التخزين المؤقت للمتصفح</li>
                <li>تحديث المتصفح إلى أحدث إصدار</li>
                <li>التواصل مع الدعم الفني</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook-based error boundary wrapper
 * For use with functional components
 */
export function withPDFErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  onReset?: () => void
) {
  return function WithErrorBoundary(props: P) {
    return (
      <PDFErrorBoundary onReset={onReset}>
        <Component {...props} />
      </PDFErrorBoundary>
    );
  };
}

