import { useReducer, useState} from 'react';
import { TaskContext } from './TaskContext';
import { initialTaskState } from './initialTaskState';
import type { ReactNode } from 'react';

// 1. Tipagem da Ação com Payload
type ActionType = {
  type: string;
  payload?: number;
};

interface TaskContextProviderProps {
  children: ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialTaskState);

  // 2. O Reducer evoluído (Trabalhando com Objetos e Payloads)
  const [myState, dispatch] = useReducer(
    (state: { secondsRemaining: number }, action: ActionType) => {
      switch (action.type) {
        case 'INCREMENT':
          return {
            ...state,
            secondsRemaining: state.secondsRemaining + (action.payload || 0),
          };
        case 'DECREMENT':
          return {
            ...state,
            secondsRemaining: state.secondsRemaining - (action.payload || 0),
          };
        case 'RESET':
          return { secondsRemaining: 0 };
        default:
          return state;
      }
    },
    { secondsRemaining: 0 } // Estado inicial como objeto
  );

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {/* TESTE DA PRÁTICA 51 */}
      <div style={{ textAlign: 'center', padding: '40px', background: '#121214', color: 'white' }}>
        <h2>Estado Atual: {JSON.stringify(myState)}</h2>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10 })}>+10</button>
          <button onClick={() => dispatch({ type: 'INCREMENT', payload: 20 })}>+20</button>
          <button onClick={() => dispatch({ type: 'DECREMENT', payload: 5 })}>-5</button>
          <button onClick={() => dispatch({ type: 'RESET' })}>RESETAR</button>
        </div>
      </div>

      {/* Mantenha comentado para focar no teste ou limpe para seguir */}
      {/* {children} */}
    </TaskContext.Provider>
  );
}