import { AuthProvider } from './auth/AuthContext';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import './styles/globals.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Elemen root tidak ditemukan.');
}

createRoot(container).render(<AuthProvider><App /></AuthProvider>);