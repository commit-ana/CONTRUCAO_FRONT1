import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep'; // ✨ Mantém a sua função direta de áudio
import type { TaskStateModel } from '../../models/TaskStateModel';

// 🚀 FIX DA PRÁTICA 66: Importação nativa do Worker via Vite (sem usar o Manager quebrado)
// @ts-ignore
import TimerWorker from '../../workers/timerWorker?worker';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  
  // ✨ PASSO 3 (Prática 67): useReducer com Inicialização Preguiçosa (Lazy Init)
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');

    if (storageState === null) return initialTaskState;

    try {
      const parsedStorageState = JSON.parse(storageState) as TaskStateModel;

      // ⚡ REIDRATAÇÃO COM TIMER ZERADO: Devolve o histórico, mas força o app a voltar "parado"
      return {
        ...parsedStorageState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
      };
    } catch (error) {
      console.error("JSON corrompido no localStorage, resetando estado:", error);
      return initialTaskState;
    }
  });

  // 🚀 FIX DA PRÁTICA 66: Referência estável para controlar o ciclo de vida do Worker
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Se existir uma tarefa em andamento no estado atual do React, controlamos o Worker
    if (state.activeTask) {
      if (!workerRef.current) {
        workerRef.current = new TimerWorker();

        // Escuta o contador estável vindo do segundo plano
        workerRef.current.onmessage = (e) => {
          console.log("⏱️ Resposta do Worker recebida:", e.data);
          const countDownSeconds = e.data;

          if (countDownSeconds <= 0) {
            // 🔊 FIX DO ÁUDIO: Dispara o som sem depender de Refs instáveis
            try {
              const playBeep = loadBeep();
              playBeep();
            } catch (error) {
              console.error("Erro ao reproduzir o alerta sonoro:", error);
            }

            dispatch({ type: TaskActionTypes.COMPLETE_TASK });
            
            if (workerRef.current) {
              workerRef.current.terminate();
              workerRef.current = null;
            }
          } else {
            dispatch({
              type: TaskActionTypes.COUNT_DOWN,
              payload: { secondsRemaining: countDownSeconds },
            });
          }
        };
      }

      // Alimenta o Worker com as informações atuais
      workerRef.current.postMessage(state);
    } else {
      // Se não há tarefa ativa (ou foi parada/concluída), destrói o Worker imediatamente
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    }

    // Sincroniza o título da aba do navegador
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

    // ✨ PASSO 2 (Prática 67): Salva o estado inteiro no localStorage sempre que mudar!
    localStorage.setItem('state', JSON.stringify(state));

  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}