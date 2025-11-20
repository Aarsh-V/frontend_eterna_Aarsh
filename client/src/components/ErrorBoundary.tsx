
import { Component, type ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Error caught by boundary:', error, info);
  }

  handleReset = () => this.setState({ hasError: false, error: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full">
            <Alert variant="destructive" data-testid="alert-error-boundary">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="text-lg font-semibold">Something went wrong</AlertTitle>
              <AlertDescription className="mt-2 space-y-4">
                <p className="text-sm">An unexpected error occurred. Try refreshing the page.</p>
                {this.state.error && (
                  <details className="text-xs">
                    <summary className="cursor-pointer font-medium">Error details</summary>
                    <pre className="mt-2 p-2 bg-muted rounded overflow-auto max-h-32">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="w-full gap-2"
                  data-testid="button-reset-error"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
