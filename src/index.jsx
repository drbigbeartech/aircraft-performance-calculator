import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './i18n.js';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
