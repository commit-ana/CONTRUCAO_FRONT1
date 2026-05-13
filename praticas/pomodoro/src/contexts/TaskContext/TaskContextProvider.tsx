import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { useState, useEffect } from 'react';
import { useReducer } from 'react';
import type { ReactNode } from 'react';

interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // --- CÓDIGO DA PRÁTICA 49 (O CONTADOR) ---
  const [numero, dispatch] = useReducer((state: number, action: string) => {
    switch (action) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      case 'INITIAL_STATE':
        return 0;
      default:
        return state;
    }
  }, 0);
  // ------------------------------------------

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {/* Teste visual da Prática 49 */}
      <div style={{ padding: '20px', border: '2px solid white', margin: '20px' }}>
        <h1>O número é: {numero}</h1>
        <button onClick={() => dispatch('INCREMENT')}>Incrementar</button>
        <button onClick={() => dispatch('DECREMENT')}>Decrementar</button>
        <button onClick={() => dispatch('INITIAL_STATE')}>ZERAR</button>
      </div>

      {/* Comente o children se quiser ver só o contador, ou deixe para ver ambos */}
      {children}
    </TaskContext.Provider>
  );
}