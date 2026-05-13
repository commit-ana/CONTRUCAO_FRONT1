import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { useState, useEffect } from 'react';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // Toda vez que o state mudar, o console nos avisa!
  useEffect(() => {
    console.log('ESTADO ATUALIZADO:', state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}


