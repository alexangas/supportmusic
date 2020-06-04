import React, {ErrorInfo} from 'react';

type ErrorBoundaryState = {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
    constructor(props: unknown) {
        super(props);
        this.state = { hasError: false };
    }

    // @ts-ignore
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h3>Something went wrong.</h3>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
