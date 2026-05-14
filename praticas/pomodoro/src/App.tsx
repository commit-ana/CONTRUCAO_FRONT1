import { Home } from './pages/Home';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';

import './styles/theme.css';
import './styles/globals.css';

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}




























































