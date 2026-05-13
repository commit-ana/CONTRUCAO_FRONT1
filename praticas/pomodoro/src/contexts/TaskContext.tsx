import { createContext, useContext } from 'react';
import type { TaskStateModel } from '../models/TaskStateModel';

// 1. Tipagem do Contexto: Ele terá o `state` e a função `setState`
export type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

// 2. Criando o Valor Inicial "Fake"
// (Isso é usado apenas se tentarmos acessar o contexto FORA do Provider, o que não faremos)
const initialContextValue: TaskContextProps = {
  state: {
    tasks: [],
    secondsRemaining: 0,
    formattedSecondsRemaining: '00:00',
    activeTask: null,
    currentCycle: 0,
    config: { workTime: 25, shortBreakTime: 5, longBreakTime: 15 },
  },
  setState: () => {}, // Função vazia de placeholder
};

// 3. Criando o Contexto em si
export const TaskContext = createContext<TaskContextProps>(initialContextValue);

// ==========================================

// 4. Criando o Componente Provider (O "Pai de Todos")
type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  // Por enquanto, vamos passar o valor falso (initialContextValue)
  // Na próxima aula, traremos o `useState` REAL para cá!
  return (
    <TaskContext.Provider value={initialContextValue}>
      {children}
    </TaskContext.Provider>
  );
}

// ==========================================

// 5. Criando o Custom Hook (Para os "Filhos" usarem)
export function useTaskContext() {
  return useContext(TaskContext);
}