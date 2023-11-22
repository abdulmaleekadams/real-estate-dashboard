import React, { useState, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    console.error('ApexCharts Error:', error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    // You can render a fallback UI here
    return <div>Something went wrong!</div>;
  }

  return <>{children}</>;
};
