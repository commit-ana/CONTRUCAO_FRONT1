import { useEffect, useReducer, useRef } from 'react';
import { initialTaskState } from './initialTaskState';
import { taskReducer } from './taskReducer';
import { TaskContext } from './TaskContext';
import { TaskActionTypes } from './TaskActions';
import { loadBeep } from '../../utils/loadBeep';

// 🚀 IMPORTAÇÃO NATIVA DO VITE: O sufixo "?worker" faz a mágica acontecer.
// O "// @ts-ignore" serve para o TypeScript não reclamar da falta de tipagem do sufixo.
// @ts-ignore
import TimerWorker from '../../workers/timerWorker?worker';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null);
  
  // Guardamos a instância do Worker controlado pelo Vite
  const workerRef = useRef<Worker | null>(null);

  // 1. Atualiza apenas o título da aba
  useEffect(() => {
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
  }, [state.formattedSecondsRemaining]);

  // 2. CONTROLADOR DO WORKER (Com detetive de erros ativado)
  useEffect(() => {
    if (state.activeTask) {
      if (!workerRef.current) {
        workerRef.current = new TimerWorker();

        // 🕵️‍♂️ LOG 1: Saber se o Worker foi criado
        console.log("🚀 Worker criado e ativo no segundo plano!");

        workerRef.current.onmessage = (e) => {
          // 🕵️‍♂️ LOG 2: Ver se o Worker está enviando os segundos de volta
          console.log("⏱️ Resposta do Worker recebida:", e.data);

          const countDownSeconds = e.data;

          if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
              playBeepRef.current();
              playBeepRef.current = null;
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

        // 🚨 O DETETIVE: Força o erro secreto do Worker a aparecer no Inspecionar!
        workerRef.current.onerror = (error) => {
          console.error("💥 ERRO OCULTO ENCONTRADO DENTRO DO WORKER:", {
            mensagem: error.message,
            arquivo: error.filename,
            linha: error.lineno
          });
        };
      }

      // 🕵️‍♂️ LOG 3: Ver o que estamos mandando para o Worker
      console.log("📤 Enviando dados atuais para o Worker:", state);
      workerRef.current.postMessage(state);

    } else {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [state.activeTask]);
  // 3. Inicializa o som do Beep
  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep();
    } else if (!state.activeTask) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}