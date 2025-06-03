import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Sepolia } from "@thirdweb-dev/chains";
import { StateContextProvider } from './context';
import App from './App';
import './index.css';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#1c1c24] flex items-center justify-center">
          <div className="bg-[#3a3a43] p-8 rounded-lg text-white text-center">
            <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
            <p className="mb-4">Please refresh the page and try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#1dc071] px-4 py-2 rounded"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Validate environment variables
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;
if (!clientId) {
  console.error('VITE_THIRDWEB_CLIENT_ID is not set in environment variables');
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThirdwebProvider 
        activeChain={Sepolia}
        clientId={clientId}
        dAppMeta={{
          name: "Crowdfunding DApp",
          description: "Decentralized crowdfunding platform",
          logoUrl: "https://example.com/logo.png",
          url: "https://example.com",
          isDarkMode: true
        }}
      >
        <Router>
          <StateContextProvider>
            <App />
          </StateContextProvider>
        </Router>
      </ThirdwebProvider>
    </ErrorBoundary>
  </React.StrictMode>
);