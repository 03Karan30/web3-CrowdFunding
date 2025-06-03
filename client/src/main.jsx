import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';

import App from './App';
import './index.css';

// ChainID is an enum, so we can use it directly 
// Inserted the ChainID of 'SEPOLIA' in here to avoid any issues 
const SEPOLIA_CHAIN_ID = 11155111;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider 
        desiredChainId={SEPOLIA_CHAIN_ID}
        clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID}
    >
        <Router>
            <StateContextProvider>
                <App />
            </StateContextProvider>
        </Router>
    </ThirdwebProvider>
)