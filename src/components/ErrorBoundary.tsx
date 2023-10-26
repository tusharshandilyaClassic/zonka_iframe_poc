import { Component } from "react";

interface Props {
  children: React.ReactNode;
  fallback: (error: any) => React.ReactNode;
}

interface State {
  hasError: boolean;
  error: any | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error: info });

    console.error({ ERROR: { error, info: info.componentStack } });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback(this.state.error);
    }

    return this.props.children;
  }
}
