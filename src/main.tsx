import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/inter';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
