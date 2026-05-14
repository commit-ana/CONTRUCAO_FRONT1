import { useEffect, useState } from 'react';
import { TaskContext } from './TaskContext'; // Ajuste o caminho se o seu arquivo se chamar index.tsx
import { initialTaskState } from './initialTaskState';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // Monitor de estado ativo novamente para o console do navegador
  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}