/**
 * Error Boundary for Enhanced HTML Editor
 * Catches and displays errors gracefully
 */

"use client";

import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class EditorErrorBoundary extends Component<Props, State> {
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
    console.error('Editor Error:', error, errorInfo);
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
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-50">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-red-100">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  حدث خطأ في المحرر
                </h3>
                <p className="text-sm text-gray-500">
                  عذراً، حدث خطأ غير متوقع
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="bg-gray-100 rounded p-3">
                <p className="text-xs font-mono text-gray-700">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={this.handleReset}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                إعادة المحاولة
              </Button>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                تحديث الصفحة
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              إذا استمرت المشكلة، يرجى الاتصال بالدعم الفني
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

