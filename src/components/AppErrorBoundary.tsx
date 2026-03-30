import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  public state: AppErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Keep production logging non-disruptive while preserving full diagnostics in dev.
    if (import.meta.env.DEV) {
      console.error("Unhandled application error", error, errorInfo);
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
          <h1 className="font-display text-4xl uppercase">Something Went Wrong</h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            The application hit an unexpected error. Please refresh the page and try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="energy-gradient rounded-sm px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;

